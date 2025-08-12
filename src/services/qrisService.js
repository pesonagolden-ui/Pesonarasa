import { config } from '../config/env.js';

// QRIS Interactive Payment Service
class QRISService {
  constructor() {
    this.baseUrl = config.qris.baseUrl;
    this.apiKey = config.qris.apiKey;
    this.merchantId = config.qris.merchantId;
    this.activePayments = new Map();
  }

  // Generate QRIS payment
  async generateQRIS(paymentData) {
    try {
      const payload = {
        merchant_id: this.merchantId,
        amount: paymentData.amount,
        order_id: paymentData.orderId,
        description: paymentData.description || 'Frozen Food Purchase',
        customer_name: paymentData.customerName,
        customer_email: paymentData.customerEmail,
        callback_url: paymentData.callbackUrl,
        expired_time: paymentData.expiredTime || 300 // 5 minutes default
      };

      const response = await fetch(`${this.baseUrl}/v1/qris/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Merchant-ID': this.merchantId
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const paymentInfo = {
          qrisId: result.data.qris_id,
          qrisString: result.data.qris_string,
          qrisImage: result.data.qris_image,
          amount: payload.amount,
          orderId: payload.order_id,
          status: 'pending',
          createdAt: new Date(),
          expiredAt: new Date(Date.now() + (payload.expired_time * 1000))
        };

        // Store active payment
        this.activePayments.set(result.data.qris_id, paymentInfo);

        return {
          success: true,
          data: paymentInfo
        };
      } else {
        throw new Error(result.message || 'Failed to generate QRIS');
      }
    } catch (error) {
      console.error('QRIS generation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(qrisId) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/qris/status/${qrisId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Merchant-ID': this.merchantId
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update local payment info
        if (this.activePayments.has(qrisId)) {
          const paymentInfo = this.activePayments.get(qrisId);
          paymentInfo.status = result.data.status;
          paymentInfo.paidAt = result.data.paid_at ? new Date(result.data.paid_at) : null;
          paymentInfo.paymentMethod = result.data.payment_method;
          this.activePayments.set(qrisId, paymentInfo);
        }

        return {
          success: true,
          data: {
            status: result.data.status,
            paidAt: result.data.paid_at,
            paymentMethod: result.data.payment_method,
            amount: result.data.amount
          }
        };
      } else {
        throw new Error(result.message || 'Failed to check payment status');
      }
    } catch (error) {
      console.error('Payment status check failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Start interactive payment monitoring
  startPaymentMonitoring(qrisId, onStatusChange) {
    const payment = this.activePayments.get(qrisId);
    if (!payment) {
      console.error('Payment not found:', qrisId);
      return null;
    }

    const checkInterval = setInterval(async () => {
      // Check if payment expired
      if (new Date() > payment.expiredAt) {
        clearInterval(checkInterval);
        payment.status = 'expired';
        this.activePayments.set(qrisId, payment);
        onStatusChange({
          status: 'expired',
          payment: payment
        });
        return;
      }

      // Check payment status
      const statusResult = await this.checkPaymentStatus(qrisId);
      if (statusResult.success) {
        const currentStatus = statusResult.data.status;
        
        if (currentStatus !== payment.status) {
          payment.status = currentStatus;
          this.activePayments.set(qrisId, payment);
          
          onStatusChange({
            status: currentStatus,
            payment: payment,
            data: statusResult.data
          });

          // Stop monitoring if payment is completed or failed
          if (currentStatus === 'paid' || currentStatus === 'failed' || currentStatus === 'cancelled') {
            clearInterval(checkInterval);
          }
        }
      }
    }, config.qris.interactive.refreshInterval);

    // Auto-stop monitoring after timeout
    setTimeout(() => {
      clearInterval(checkInterval);
    }, config.qris.interactive.timeout);

    return checkInterval;
  }

  // Cancel payment
  async cancelPayment(qrisId) {
    try {
      const response = await fetch(`${this.baseUrl}/v1/qris/cancel/${qrisId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Merchant-ID': this.merchantId
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update local payment info
        if (this.activePayments.has(qrisId)) {
          const paymentInfo = this.activePayments.get(qrisId);
          paymentInfo.status = 'cancelled';
          this.activePayments.set(qrisId, paymentInfo);
        }

        return {
          success: true,
          message: 'Payment cancelled successfully'
        };
      } else {
        throw new Error(result.message || 'Failed to cancel payment');
      }
    } catch (error) {
      console.error('Payment cancellation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get payment info
  getPaymentInfo(qrisId) {
    return this.activePayments.get(qrisId) || null;
  }

  // Get all active payments
  getActivePayments() {
    return Array.from(this.activePayments.values());
  }

  // Clear expired payments
  clearExpiredPayments() {
    const now = new Date();
    for (const [qrisId, payment] of this.activePayments.entries()) {
      if (now > payment.expiredAt && payment.status === 'pending') {
        payment.status = 'expired';
        this.activePayments.set(qrisId, payment);
      }
    }
  }

  // Format amount for display
  formatAmount(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }
}

// Export singleton instance
export const qrisService = new QRISService();
export default qrisService;
