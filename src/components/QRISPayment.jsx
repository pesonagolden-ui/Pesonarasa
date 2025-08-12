import React, { useState, useEffect, useRef } from 'react';
import { qrisService } from '../services/qrisService.js';

const QRISPayment = ({ 
  amount, 
  orderId, 
  customerName, 
  customerEmail,
  onPaymentComplete,
  onPaymentFailed,
  onPaymentCancelled,
  className = ''
}) => {
  const [qrisData, setQrisData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, generating, pending, paid, failed, expired, cancelled
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [error, setError] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const monitoringRef = useRef(null);
  const timerRef = useRef(null);

  // Generate QRIS payment
  const generatePayment = async () => {
    setPaymentStatus('generating');
    setError(null);

    try {
      const result = await qrisService.generateQRIS({
        amount,
        orderId,
        customerName,
        customerEmail,
        description: `Frozen Food Order #${orderId}`,
        expiredTime: 300 // 5 minutes
      });

      if (result.success) {
        setQrisData(result.data);
        setPaymentStatus('pending');
        setTimeRemaining(300); // 5 minutes
        startPaymentMonitoring(result.data.qrisId);
        startTimer();
      } else {
        setError(result.error);
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment generation failed:', error);
      setError(error.message);
      setPaymentStatus('failed');
    }
  };

  // Start payment monitoring
  const startPaymentMonitoring = (qrisId) => {
    if (isMonitoring) return;

    setIsMonitoring(true);
    monitoringRef.current = qrisService.startPaymentMonitoring(qrisId, (statusUpdate) => {
      console.log('Payment status update:', statusUpdate);
      
      setPaymentStatus(statusUpdate.status);
      
      switch (statusUpdate.status) {
        case 'paid':
          setIsMonitoring(false);
          stopTimer();
          if (onPaymentComplete) {
            onPaymentComplete({
              qrisId,
              amount,
              orderId,
              paidAt: statusUpdate.data?.paidAt,
              paymentMethod: statusUpdate.data?.paymentMethod
            });
          }
          break;
          
        case 'failed':
          setIsMonitoring(false);
          stopTimer();
          if (onPaymentFailed) {
            onPaymentFailed({
              qrisId,
              error: 'Payment failed'
            });
          }
          break;
          
        case 'expired':
          setIsMonitoring(false);
          stopTimer();
          setTimeRemaining(0);
          break;
          
        case 'cancelled':
          setIsMonitoring(false);
          stopTimer();
          if (onPaymentCancelled) {
            onPaymentCancelled({
              qrisId,
              reason: 'Payment cancelled'
            });
          }
          break;
      }
    });
  };

  // Start countdown timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopTimer();
          setPaymentStatus('expired');
          setIsMonitoring(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cancel payment
  const cancelPayment = async () => {
    if (!qrisData) return;

    try {
      const result = await qrisService.cancelPayment(qrisData.qrisId);
      if (result.success) {
        setPaymentStatus('cancelled');
        setIsMonitoring(false);
        stopTimer();
        
        if (onPaymentCancelled) {
          onPaymentCancelled({
            qrisId: qrisData.qrisId,
            reason: 'Cancelled by user'
          });
        }
      }
    } catch (error) {
      console.error('Payment cancellation failed:', error);
    }
  };

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
      setIsMonitoring(false);
    };
  }, []);

  // Auto-generate payment on mount
  useEffect(() => {
    if (amount && orderId && paymentStatus === 'idle') {
      generatePayment();
    }
  }, [amount, orderId]);

  return (
    <div className={`qris-payment ${className}`}>
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3>QRIS Payment</h3>
          <p style={{ color: '#666', margin: '5px 0' }}>
            Order #{orderId}
          </p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
            {qrisService.formatAmount(amount)}
          </p>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'generating' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
            <p>Generating QRIS code...</p>
          </div>
        )}

        {paymentStatus === 'pending' && qrisData && (
          <div>
            {/* Timer */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                Time remaining: <strong>{formatTimeRemaining(timeRemaining)}</strong>
              </p>
            </div>

            {/* QRIS Code */}
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              {qrisData.qrisImage ? (
                <img 
                  src={qrisData.qrisImage} 
                  alt="QRIS Code"
                  style={{ 
                    maxWidth: '250px', 
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              ) : (
                <div style={{
                  width: '250px',
                  height: '250px',
                  margin: '0 auto',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f9f9f9'
                }}>
                  <p>QRIS Code</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>How to pay:</h4>
              <ol style={{ fontSize: '14px', paddingLeft: '20px', margin: '0' }}>
                <li>Open your mobile banking or e-wallet app</li>
                <li>Select "Scan QR" or "QRIS" feature</li>
                <li>Scan the QR code above</li>
                <li>Confirm the payment amount</li>
                <li>Complete the payment</li>
              </ol>
            </div>

            {/* Status indicator */}
            <div style={{ 
              textAlign: 'center', 
              padding: '10px',
              backgroundColor: '#e3f2fd',
              borderRadius: '4px',
              marginBottom: '15px'
            }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#1976d2' }}>
                🔄 Waiting for payment...
              </p>
            </div>

            {/* Cancel button */}
            <button
              onClick={cancelPayment}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel Payment
            </button>
          </div>
        )}

        {paymentStatus === 'paid' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px', color: '#4CAF50' }}>✅</div>
            <h3 style={{ color: '#4CAF50', margin: '10px 0' }}>Payment Successful!</h3>
            <p>Thank you for your payment.</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Order #{orderId} has been confirmed.
            </p>
          </div>
        )}

        {paymentStatus === 'expired' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px', color: '#ff9800' }}>⏰</div>
            <h3 style={{ color: '#ff9800', margin: '10px 0' }}>Payment Expired</h3>
            <p>The payment session has expired.</p>
            <button
              onClick={generatePayment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Generate New QRIS
            </button>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px', color: '#f44336' }}>❌</div>
            <h3 style={{ color: '#f44336', margin: '10px 0' }}>Payment Failed</h3>
            <p>{error || 'An error occurred during payment.'}</p>
            <button
              onClick={generatePayment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {paymentStatus === 'cancelled' && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px', color: '#9e9e9e' }}>🚫</div>
            <h3 style={{ color: '#9e9e9e', margin: '10px 0' }}>Payment Cancelled</h3>
            <p>The payment has been cancelled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRISPayment;
