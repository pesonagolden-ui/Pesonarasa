import React, { useState, useEffect } from 'react';
import { googleServices } from './services/googleServices.js';
import { qrisService } from './services/qrisService.js';
import { config, validateConfig } from './config/env.js';
import ImageUploader from './components/ImageUploader.jsx';
import QRISPayment from './components/QRISPayment.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [paymentData, setPaymentData] = useState({
    amount: 150000,
    orderId: `ORDER-${Date.now()}`,
    customerName: '',
    customerEmail: ''
  });

  // Initialize app
  useEffect(() => {
    // Validate configuration
    const isConfigValid = validateConfig();
    if (!isConfigValid) {
      console.warn('Some configuration values are missing. Please check your environment variables.');
    }

    // Initialize Google Services
    googleServices.initialize().catch(console.error);

    // Check if user is already signed in
    const checkUser = () => {
      if (googleServices.isSignedIn()) {
        const currentUser = googleServices.getCurrentUser();
        setUser(currentUser);
        setPaymentData(prev => ({
          ...prev,
          customerName: currentUser.name,
          customerEmail: currentUser.email
        }));
      }
    };

    // Check user status after a short delay to ensure Google API is loaded
    setTimeout(checkUser, 1000);
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleServices.signIn();
      if (result.success) {
        setUser(result.user);
        setPaymentData(prev => ({
          ...prev,
          customerName: result.user.name,
          customerEmail: result.user.email
        }));
      } else {
        alert('Sign in failed: ' + result.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed: ' + error.message);
    }
  };

  // Handle Google Sign Out
  const handleGoogleSignOut = async () => {
    try {
      await googleServices.signOut();
      setUser(null);
      setPaymentData(prev => ({
        ...prev,
        customerName: '',
        customerEmail: ''
      }));
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Handle image upload completion
  const handleImageUploadComplete = (result) => {
    if (result.success) {
      setUploadedImages(prev => [...prev, ...result.files]);
      alert(`Successfully uploaded ${result.successCount} image(s)!`);
    } else {
      alert('Upload failed: ' + result.error);
    }
  };

  // Handle payment completion
  const handlePaymentComplete = (paymentResult) => {
    alert(`Payment successful! Order ${paymentResult.orderId} has been paid.`);
    setShowPayment(false);
    // Here you would typically update your order status, send confirmation email, etc.
  };

  // Handle payment failure
  const handlePaymentFailed = (error) => {
    alert('Payment failed: ' + error.error);
  };

  // Handle payment cancellation
  const handlePaymentCancelled = (result) => {
    alert('Payment was cancelled.');
    setShowPayment(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <header style={{ 
        padding: '20px', 
        backgroundColor: '#2196F3', 
        color: 'white',
        marginBottom: '20px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0 }}>🧊 Frozen Food E-commerce</h1>
          
          {/* User section */}
          <div>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={user.imageUrl} 
                  alt={user.name}
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%' 
                  }}
                />
                <span>{user.name}</span>
                <button 
                  onClick={handleGoogleSignOut}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={handleGoogleSignIn}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  color: '#2196F3',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🔐 Sign in with Google
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Features showcase */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          
          {/* Image Upload Section */}
          <div style={{ 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <h2>📷 Image Upload</h2>
            <p>Upload product images to Google Drive with automatic compression and optimization.</p>
            
            <ImageUploader
              multiple={true}
              maxFiles={5}
              onUploadComplete={handleImageUploadComplete}
              onUploadProgress={(progress) => console.log('Upload progress:', progress)}
            />

            {/* Uploaded images display */}
            {uploadedImages.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h4>Uploaded Images:</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '10px'
                }}>
                  {uploadedImages.map((image, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <img 
                        src={image.url} 
                        alt={image.fileName}
                        style={{ 
                          width: '100%', 
                          height: '80px', 
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      />
                      <p style={{ 
                        fontSize: '10px', 
                        margin: '5px 0 0 0',
                        wordBreak: 'break-all'
                      }}>
                        {image.fileName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* QRIS Payment Section */}
          <div style={{ 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <h2>💳 QRIS Payment</h2>
            <p>Interactive QRIS payment system with real-time status monitoring.</p>
            
            {!showPayment ? (
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Amount:</label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Customer Name:</label>
                  <input
                    type="text"
                    value={paymentData.customerName}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, customerName: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Customer Email:</label>
                  <input
                    type="email"
                    value={paymentData.customerEmail}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>

                <button
                  onClick={() => setShowPayment(true)}
                  disabled={!paymentData.customerName || !paymentData.customerEmail}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: paymentData.customerName && paymentData.customerEmail ? '#4CAF50' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: paymentData.customerName && paymentData.customerEmail ? 'pointer' : 'not-allowed',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Generate QRIS Payment
                </button>
              </div>
            ) : (
              <QRISPayment
                amount={paymentData.amount}
                orderId={paymentData.orderId}
                customerName={paymentData.customerName}
                customerEmail={paymentData.customerEmail}
                onPaymentComplete={handlePaymentComplete}
                onPaymentFailed={handlePaymentFailed}
                onPaymentCancelled={handlePaymentCancelled}
              />
            )}
          </div>
        </div>

        {/* Configuration Info */}
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>🔧 Configuration Status</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            <div>
              <h4>Supabase</h4>
              <p>URL: {config.supabase.url ? '✅ Configured' : '❌ Missing'}</p>
              <p>Key: {config.supabase.anonKey ? '✅ Configured' : '❌ Missing'}</p>
            </div>
            <div>
              <h4>Google APIs</h4>
              <p>API Key: {config.google.apiKey ? '✅ Configured' : '❌ Missing'}</p>
              <p>Client ID: {config.google.clientId ? '✅ Configured' : '❌ Missing'}</p>
            </div>
            <div>
              <h4>QRIS</h4>
              <p>Merchant ID: {config.qris.merchantId ? '✅ Configured' : '❌ Missing'}</p>
              <p>API Key: {config.qris.apiKey ? '✅ Configured' : '❌ Missing'}</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        marginTop: '40px'
      }}>
        <p>&copy; 2024 Frozen Food E-commerce. Built with React + Vite.</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Features: Google Authentication, Image Upload to Drive, Interactive QRIS Payment
        </p>
      </footer>
    </div>
  );
}

export default App;
