import { config } from '../config/env.js';
import { googleServices } from './googleServices.js';

// Image Upload and Management Service
class ImageService {
  constructor() {
    this.maxSize = config.imageUpload.maxSize;
    this.allowedTypes = config.imageUpload.allowedTypes;
    this.quality = config.imageUpload.quality;
    this.maxWidth = config.imageUpload.maxWidth;
    this.maxHeight = config.imageUpload.maxHeight;
  }

  // Validate image file
  validateImage(file) {
    const errors = [];

    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed. Allowed types: ${this.allowedTypes.join(', ')}`);
    }

    // Check file size
    if (file.size > this.maxSize) {
      errors.push(`File size ${this.formatFileSize(file.size)} exceeds maximum allowed size ${this.formatFileSize(this.maxSize)}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Compress and resize image
  async compressImage(file, options = {}) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions
          const { width, height } = this.calculateDimensions(
            img.width, 
            img.height, 
            options.maxWidth || this.maxWidth,
            options.maxHeight || this.maxHeight
          );

          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                }));
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            file.type,
            options.quality || this.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Calculate optimal dimensions
  calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
    let { width, height } = { width: originalWidth, height: originalHeight };

    // Scale down if necessary
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }

    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    return { width: Math.round(width), height: Math.round(height) };
  }

  // Upload image to Google Drive
  async uploadToGoogleDrive(file, options = {}) {
    try {
      // Validate image
      const validation = this.validateImage(file);
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      // Compress image if needed
      let processedFile = file;
      if (options.compress !== false) {
        processedFile = await this.compressImage(file, options);
      }

      // Upload to Google Drive
      const uploadResult = await googleServices.uploadImage(
        processedFile, 
        options.fileName
      );

      if (uploadResult.success) {
        return {
          success: true,
          data: {
            fileId: uploadResult.fileId,
            fileName: uploadResult.fileName,
            url: uploadResult.downloadLink,
            webViewLink: uploadResult.webViewLink,
            originalSize: file.size,
            compressedSize: processedFile.size,
            compressionRatio: ((file.size - processedFile.size) / file.size * 100).toFixed(2)
          }
        };
      } else {
        return uploadResult;
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload multiple images
  async uploadMultipleImages(files, options = {}) {
    const results = [];
    const maxConcurrent = options.maxConcurrent || 3;

    // Process files in batches
    for (let i = 0; i < files.length; i += maxConcurrent) {
      const batch = files.slice(i, i + maxConcurrent);
      const batchPromises = batch.map((file, index) => 
        this.uploadToGoogleDrive(file, {
          ...options,
          fileName: options.fileName ? `${options.fileName}_${i + index + 1}` : undefined
        })
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Optional progress callback
      if (options.onProgress) {
        options.onProgress({
          completed: Math.min(i + maxConcurrent, files.length),
          total: files.length,
          percentage: Math.round((Math.min(i + maxConcurrent, files.length) / files.length) * 100)
        });
      }
    }

    return {
      success: results.every(r => r.success),
      results,
      successCount: results.filter(r => r.success).length,
      failureCount: results.filter(r => !r.success).length
    };
  }

  // Create image preview
  createPreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve({
          url: e.target.result,
          name: file.name,
          size: file.size,
          type: file.type
        });
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // Create multiple previews
  async createMultiplePreviews(files) {
    const previews = await Promise.all(
      Array.from(files).map(file => this.createPreview(file))
    );
    return previews;
  }

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get image metadata
  async getImageMetadata(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
          size: file.size,
          type: file.type,
          name: file.name,
          lastModified: new Date(file.lastModified)
        });
      };
      
      img.onerror = () => reject(new Error('Failed to load image metadata'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Batch process images with metadata
  async processImagesWithMetadata(files) {
    const results = [];
    
    for (const file of files) {
      try {
        const validation = this.validateImage(file);
        const metadata = await this.getImageMetadata(file);
        const preview = await this.createPreview(file);
        
        results.push({
          file,
          validation,
          metadata,
          preview,
          isValid: validation.isValid
        });
      } catch (error) {
        results.push({
          file,
          validation: { isValid: false, errors: [error.message] },
          metadata: null,
          preview: null,
          isValid: false
        });
      }
    }
    
    return results;
  }
}

// Export singleton instance
export const imageService = new ImageService();
export default imageService;
