# API Documentation

## Overview

This document describes the APIs and services used in the Frozen Food E-commerce application.

## Services

### 1. Google Services (`src/services/googleServices.js`)

#### Authentication

```javascript
// Sign in with Google
const result = await googleServices.signIn();
if (result.success) {
  console.log('User:', result.user);
}

// Sign out
await googleServices.signOut();

// Check if signed in
const isSignedIn = googleServices.isSignedIn();

// Get current user
const user = googleServices.getCurrentUser();
```

#### Image Upload

```javascript
// Upload single image
const result = await googleServices.uploadImage(file, 'custom-filename.jpg');
if (result.success) {
  console.log('File ID:', result.fileId);
  console.log('Download URL:', result.downloadLink);
}
```

### 2. QRIS Service (`src/services/qrisService.js`)

#### Generate Payment

```javascript
const paymentData = {
  amount: 150000,
  orderId: 'ORDER-123',
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  description: 'Frozen Food Purchase',
  expiredTime: 300 // 5 minutes
};

const result = await qrisService.generateQRIS(paymentData);
if (result.success) {
  console.log('QRIS ID:', result.data.qrisId);
  console.log('QRIS Image:', result.data.qrisImage);
}
```

#### Monitor Payment Status

```javascript
// Start monitoring
const intervalId = qrisService.startPaymentMonitoring(qrisId, (statusUpdate) => {
  console.log('Status:', statusUpdate.status);
  
  switch (statusUpdate.status) {
    case 'paid':
      console.log('Payment successful!');
      break;
    case 'expired':
      console.log('Payment expired');
      break;
    case 'failed':
      console.log('Payment failed');
      break;
  }
});

// Check status manually
const status = await qrisService.checkPaymentStatus(qrisId);
console.log('Current status:', status.data.status);

// Cancel payment
const cancelResult = await qrisService.cancelPayment(qrisId);
```

### 3. Image Service (`src/services/imageService.js`)

#### Image Validation and Processing

```javascript
// Validate image
const validation = imageService.validateImage(file);
if (!validation.isValid) {
  console.log('Errors:', validation.errors);
}

// Compress image
const compressedFile = await imageService.compressImage(file, {
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080
});

// Upload to Google Drive
const uploadResult = await imageService.uploadToGoogleDrive(file, {
  compress: true,
  fileName: 'product-image.jpg'
});

// Upload multiple images
const files = [file1, file2, file3];
const multiUploadResult = await imageService.uploadMultipleImages(files, {
  maxConcurrent: 3,
  onProgress: (progress) => {
    console.log(`Progress: ${progress.percentage}%`);
  }
});

// Create preview
const preview = await imageService.createPreview(file);
console.log('Preview URL:', preview.url);

// Get image metadata
const metadata = await imageService.getImageMetadata(file);
console.log('Dimensions:', metadata.width, 'x', metadata.height);
```

## Components

### 1. ImageUploader Component

```jsx
import ImageUploader from './components/ImageUploader.jsx';

<ImageUploader
  multiple={true}
  maxFiles={5}
  onUploadComplete={(result) => {
    if (result.success) {
      console.log('Uploaded files:', result.files);
    }
  }}
  onUploadProgress={(progress) => {
    console.log(`Upload progress: ${progress.percentage}%`);
  }}
/>
```

#### Props

- `multiple` (boolean): Allow multiple file selection
- `maxFiles` (number): Maximum number of files allowed
- `className` (string): CSS class name
- `onUploadComplete` (function): Callback when upload completes
- `onUploadProgress` (function): Callback for upload progress
- `children` (ReactNode): Custom upload trigger content

### 2. QRISPayment Component

```jsx
import QRISPayment from './components/QRISPayment.jsx';

<QRISPayment
  amount={150000}
  orderId="ORDER-123"
  customerName="John Doe"
  customerEmail="john@example.com"
  onPaymentComplete={(result) => {
    console.log('Payment completed:', result);
  }}
  onPaymentFailed={(error) => {
    console.log('Payment failed:', error);
  }}
  onPaymentCancelled={(result) => {
    console.log('Payment cancelled:', result);
  }}
/>
```

#### Props

- `amount` (number): Payment amount in IDR
- `orderId` (string): Unique order identifier
- `customerName` (string): Customer name
- `customerEmail` (string): Customer email
- `onPaymentComplete` (function): Callback when payment succeeds
- `onPaymentFailed` (function): Callback when payment fails
- `onPaymentCancelled` (function): Callback when payment is cancelled
- `className` (string): CSS class name

## Configuration

### Environment Variables

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google APIs
VITE_GOOGLE_API_KEY=your_google_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# QRIS Payment
VITE_QRIS_MERCHANT_ID=your_merchant_id
VITE_QRIS_API_KEY=your_qris_api_key
VITE_QRIS_BASE_URL=https://api.qris.id
```

### Configuration Object

```javascript
import { config } from './config/env.js';

// Access configuration
console.log('Supabase URL:', config.supabase.url);
console.log('Google API Key:', config.google.apiKey);
console.log('QRIS Merchant ID:', config.qris.merchantId);

// Validate configuration
import { validateConfig } from './config/env.js';
const isValid = validateConfig();
```

## Error Handling

All services return consistent response objects:

```javascript
// Success response
{
  success: true,
  data: { /* response data */ }
}

// Error response
{
  success: false,
  error: "Error message"
}
```

## Best Practices

1. **Always check for success before accessing data**
2. **Handle errors gracefully with user-friendly messages**
3. **Validate user inputs before API calls**
4. **Use loading states for better UX**
5. **Implement proper cleanup for monitoring intervals**
6. **Keep API keys secure and never commit them to version control**

## Rate Limits

- Google Drive API: 1,000 requests per 100 seconds per user
- QRIS API: Varies by provider (typically 100 requests per minute)

## Security Considerations

1. **API keys should be stored in environment variables**
2. **Use HTTPS for all API communications**
3. **Validate file types and sizes before upload**
4. **Implement proper authentication checks**
5. **Sanitize user inputs**
6. **Use secure payment processing**
