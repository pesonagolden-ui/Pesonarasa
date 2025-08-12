import React, { useState, useRef } from 'react';
import { imageService } from '../services/imageService.js';
import { googleServices } from '../services/googleServices.js';

const ImageUploader = ({ 
  onUploadComplete, 
  onUploadProgress, 
  multiple = false,
  maxFiles = 5,
  className = '',
  children 
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setError(null);
    
    try {
      // Validate file count
      if (multiple && files.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Process files and create previews
      const processedFiles = await imageService.processImagesWithMetadata(files);
      
      // Check for validation errors
      const invalidFiles = processedFiles.filter(f => !f.isValid);
      if (invalidFiles.length > 0) {
        const errors = invalidFiles.flatMap(f => f.validation.errors);
        setError(errors.join(', '));
        return;
      }

      // Set previews
      setPreviews(processedFiles.map(f => f.preview));
      
      // Start upload
      await handleUpload(files);
      
    } catch (error) {
      console.error('File processing failed:', error);
      setError(error.message);
    }
  };

  // Handle upload
  const handleUpload = async (files) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Check if user is signed in to Google
      if (!googleServices.isSignedIn()) {
        const signInResult = await googleServices.signIn();
        if (!signInResult.success) {
          throw new Error('Google sign-in required for image upload');
        }
      }

      // Upload files
      const uploadResult = await imageService.uploadMultipleImages(files, {
        compress: true,
        onProgress: (progress) => {
          setUploadProgress(progress.percentage);
          if (onUploadProgress) {
            onUploadProgress(progress);
          }
        }
      });

      if (uploadResult.success) {
        // Call completion callback
        if (onUploadComplete) {
          onUploadComplete({
            success: true,
            files: uploadResult.results.filter(r => r.success).map(r => r.data),
            successCount: uploadResult.successCount,
            failureCount: uploadResult.failureCount
          });
        }

        // Clear previews after successful upload
        setTimeout(() => {
          setPreviews([]);
          setUploadProgress(0);
        }, 2000);
      } else {
        throw new Error('Some uploads failed');
      }

    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message);
      
      if (onUploadComplete) {
        onUploadComplete({
          success: false,
          error: error.message
        });
      }
    } finally {
      setUploading(false);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove preview
  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`image-uploader ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Upload trigger */}
      <div 
        onClick={triggerFileInput}
        className="upload-trigger"
        style={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: uploading ? '#f5f5f5' : 'transparent'
        }}
      >
        {children || (
          <div>
            <div style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}>
              📷
            </div>
            <p>Click to upload images</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              {multiple ? `Up to ${maxFiles} files` : 'Single file'} • 
              Max {imageService.formatFileSize(imageService.maxSize)} • 
              JPG, PNG, WebP, GIF
            </p>
          </div>
        )}
      </div>

      {/* Upload progress */}
      {uploading && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div 
              style={{
                width: `${uploadProgress}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '12px' }}>
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {/* Image previews */}
      {previews.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h4>Preview:</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '10px'
          }}>
            {previews.map((preview, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={preview.url}
                  alt={preview.name}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
                <button
                  onClick={() => removePreview(index)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '2px 5px',
                  fontSize: '10px',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px'
                }}>
                  {imageService.formatFileSize(preview.size)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
