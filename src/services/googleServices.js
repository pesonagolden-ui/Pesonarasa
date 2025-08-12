import { config } from '../config/env.js';

// Google API Service
class GoogleServices {
  constructor() {
    this.isInitialized = false;
    this.gapi = null;
  }

  // Initialize Google APIs
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Load Google API script
      await this.loadGoogleAPI();
      
      // Initialize gapi
      await new Promise((resolve) => {
        window.gapi.load('auth2:client:drive:picker', resolve);
      });

      // Initialize auth2
      await window.gapi.client.init({
        apiKey: config.google.apiKey,
        clientId: config.google.clientId,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
          'https://photoslibrary.googleapis.com/$discovery/rest?version=v1'
        ],
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/photoslibrary'
      });

      this.gapi = window.gapi;
      this.isInitialized = true;
      console.log('Google APIs initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google APIs:', error);
      throw error;
    }
  }

  // Load Google API script
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Google Authentication
  async signIn() {
    if (!this.isInitialized) await this.initialize();

    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      return {
        success: true,
        user: {
          id: user.getId(),
          name: user.getBasicProfile().getName(),
          email: user.getBasicProfile().getEmail(),
          imageUrl: user.getBasicProfile().getImageUrl(),
          token: user.getAuthResponse().access_token
        }
      };
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign out
  async signOut() {
    if (!this.isInitialized) return;

    try {
      const authInstance = this.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      return { success: true };
    } catch (error) {
      console.error('Google sign-out failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Upload image to Google Drive
  async uploadImage(file, fileName = null) {
    if (!this.isInitialized) await this.initialize();

    try {
      const metadata = {
        name: fileName || `frozen-food-${Date.now()}.${file.type.split('/')[1]}`,
        parents: ['your-folder-id'] // Replace with your Google Drive folder ID
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`
        },
        body: form
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          fileId: result.id,
          fileName: result.name,
          webViewLink: `https://drive.google.com/file/d/${result.id}/view`,
          downloadLink: `https://drive.google.com/uc?id=${result.id}`
        };
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    if (!this.isInitialized) return null;

    const authInstance = this.gapi.auth2.getAuthInstance();
    const user = authInstance.currentUser.get();
    
    if (user.isSignedIn()) {
      return {
        id: user.getId(),
        name: user.getBasicProfile().getName(),
        email: user.getBasicProfile().getEmail(),
        imageUrl: user.getBasicProfile().getImageUrl()
      };
    }
    
    return null;
  }

  // Check if user is signed in
  isSignedIn() {
    if (!this.isInitialized) return false;
    
    const authInstance = this.gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get();
  }
}

// Export singleton instance
export const googleServices = new GoogleServices();
export default googleServices;
