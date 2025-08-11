import axios from 'axios';

export interface XendithConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  environment: 'sandbox' | 'production';
}

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface PaymentRequest {
  items: PaymentItem[];
  customer: CustomerInfo;
  orderId: string;
  amount: number;
  currency: string;
  description?: string;
  successUrl?: string;
  failureUrl?: string;
  callbackUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  invoiceId?: string;
  invoiceUrl?: string;
  paymentUrl?: string;
  qrCode?: string;
  message?: string;
  error?: string;
}

export interface TransactionStatus {
  invoiceId: string;
  status: 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled';
  amount: number;
  paidAmount?: number;
  paidAt?: string;
  expiredAt?: string;
  paymentMethod?: string;
}

class XendithPaymentService {
  private config: XendithConfig;
  private apiClient: any;

  constructor(config: XendithConfig) {
    this.config = config;
    this.apiClient = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'X-API-Key': config.apiKey
      },
      timeout: 30000
    });

    // Add request interceptor for authentication
    this.apiClient.interceptors.request.use((config: any) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = this.generateSignature(config.data, timestamp);
      
      config.headers['X-Timestamp'] = timestamp;
      config.headers['X-Signature'] = signature;
      
      return config;
    });
  }

  // Generate signature for API requests
  private generateSignature(data: any, timestamp: number): string {
    const crypto = require('crypto');
    const payload = JSON.stringify(data) + timestamp + this.config.secretKey;
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  // Create payment invoice
  async createInvoice(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const requestData = {
        external_id: paymentRequest.orderId,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency || 'IDR',
        description: paymentRequest.description || 'Pembayaran Pesona Rasa',
        invoice_duration: 86400, // 24 hours
        customer: {
          given_names: paymentRequest.customer.name,
          email: paymentRequest.customer.email,
          mobile_number: paymentRequest.customer.phone
        },
        customer_notification_preference: {
          invoice_created: ['email'],
          invoice_reminder: ['email'],
          invoice_paid: ['email']
        },
        success_redirect_url: paymentRequest.successUrl,
        failure_redirect_url: paymentRequest.failureUrl,
        items: paymentRequest.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          category: 'Frozen Food'
        }))
      };

      const response = await this.apiClient.post('/v2/invoices', requestData);
      
      if (response.data) {
        return {
          success: true,
          invoiceId: response.data.id,
          invoiceUrl: response.data.invoice_url,
          paymentUrl: response.data.invoice_url,
          qrCode: response.data.qr_code_url
        };
      } else {
        return {
          success: false,
          error: 'Invalid response from payment gateway'
        };
      }
    } catch (error: any) {
      console.error('Xendith payment error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Payment creation failed'
      };
    }
  }

  // Check payment status
  async getPaymentStatus(invoiceId: string): Promise<TransactionStatus> {
    try {
      const response = await this.apiClient.get(`/v2/invoices/${invoiceId}`);
      
      const data = response.data;
      return {
        invoiceId: data.id,
        status: this.mapXendithStatus(data.status),
        amount: data.amount,
        paidAmount: data.paid_amount,
        paidAt: data.paid_at,
        expiredAt: data.expiry_date,
        paymentMethod: data.payment_method
      };
    } catch (error: any) {
      console.error('Error checking payment status:', error);
      throw new Error(error.response?.data?.message || 'Failed to check payment status');
    }
  }

  // Map Xendith status to our internal status
  private mapXendithStatus(xendithStatus: string): TransactionStatus['status'] {
    switch (xendithStatus.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'paid':
      case 'settled':
        return 'paid';
      case 'expired':
        return 'expired';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'failed';
    }
  }

  // Get available payment methods
  async getPaymentMethods(): Promise<any[]> {
    try {
      const response = await this.apiClient.get('/payment_methods');
      return response.data || [];
    } catch (error: any) {
      console.error('Error fetching payment methods:', error);
      return [];
    }
  }

  // Create direct charge (for saved payment methods)
  async createDirectCharge(paymentRequest: PaymentRequest & { paymentMethodId: string }): Promise<PaymentResponse> {
    try {
      const requestData = {
        reference_id: paymentRequest.orderId,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency || 'IDR',
        payment_method_id: paymentRequest.paymentMethodId,
        description: paymentRequest.description || 'Pembayaran Pesona Rasa',
        customer: {
          reference_id: paymentRequest.customer.email,
          given_names: paymentRequest.customer.name,
          email: paymentRequest.customer.email,
          mobile_number: paymentRequest.customer.phone
        }
      };

      const response = await this.apiClient.post('/ewallets/charges', requestData);
      
      if (response.data) {
        return {
          success: true,
          invoiceId: response.data.id,
          paymentUrl: response.data.actions?.desktop_web_checkout_url,
          message: 'Direct charge created successfully'
        };
      } else {
        return {
          success: false,
          error: 'Invalid response from payment gateway'
        };
      }
    } catch (error: any) {
      console.error('Xendith direct charge error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Direct charge failed'
      };
    }
  }
}

// Default configuration
export const getXendithConfig = (): XendithConfig => {
  const environment = (import.meta.env.VITE_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production';
  
  return {
    apiKey: import.meta.env.VITE_XENDITH_API_KEY || '',
    secretKey: import.meta.env.VITE_XENDITH_SECRET_KEY || '',
    baseUrl: environment === 'production' 
      ? 'https://api.xendith.com' 
      : 'https://api.xendith.com', // Xendith uses same URL for both
    environment
  };
};

// Create singleton instance
export const xendithPayment = new XendithPaymentService(getXendithConfig());

export default XendithPaymentService;
