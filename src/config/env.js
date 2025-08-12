// Environment Configuration
export const config = {
  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://zzpqchngxewnudlkzzew.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6cHFjaG5neGV3bnVkbGt6emV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NDM3MDIsImV4cCI6MjA3MDQxOTcwMn0.JolXPmk7UHoJ0Zw3gluopQQU0kBlj-3RWwyb3iy-Pnc'
  },

  // Google APIs Configuration
  google: {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    // Google Maps API Key
    mapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    // Google Drive API
    driveApiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || '',
    // Google Photos API
    photosApiKey: import.meta.env.VITE_GOOGLE_PHOTOS_API_KEY || ''
  },

  // QRIS Configuration
  qris: {
    merchantId: import.meta.env.VITE_QRIS_MERCHANT_ID || '',
    apiKey: import.meta.env.VITE_QRIS_API_KEY || '',
    baseUrl: import.meta.env.VITE_QRIS_BASE_URL || 'https://api.qris.id',
    // Interactive QRIS settings
    interactive: {
      enabled: true,
      timeout: 300000, // 5 minutes
      refreshInterval: 5000 // 5 seconds
    }
  },

  // Image Upload Configuration
  imageUpload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080
  },

  // App Configuration
  app: {
    name: 'Frozen Food E-commerce',
    version: '1.0.0',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
  }
};

// Validation function
export const validateConfig = () => {
  const errors = [];

  if (!config.supabase.url) {
    errors.push('Supabase URL is required');
  }

  if (!config.supabase.anonKey) {
    errors.push('Supabase Anon Key is required');
  }

  if (errors.length > 0) {
    console.warn('Configuration warnings:', errors);
  }

  return errors.length === 0;
};

export default config;
