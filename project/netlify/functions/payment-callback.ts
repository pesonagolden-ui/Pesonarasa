import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Callback-Token',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verify callback token (Xendith sends this for security)
    const callbackToken = event.headers['x-callback-token'];
    const expectedToken = process.env.XENDITH_CALLBACK_TOKEN;
    
    if (expectedToken && callbackToken !== expectedToken) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid callback token' }),
      };
    }

    const payload = JSON.parse(event.body || '{}');
    
    // Log the callback for debugging
    console.log('Payment callback received:', payload);

    // Extract payment information
    const {
      id: invoiceId,
      external_id: orderId,
      status,
      amount,
      paid_amount,
      paid_at,
      payment_method,
      customer
    } = payload;

    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Send confirmation emails
    // 3. Update inventory
    // 4. Trigger fulfillment processes

    // For now, we'll just log the successful payment
    if (status === 'PAID') {
      console.log(`Payment successful for order ${orderId}:`, {
        invoiceId,
        amount: paid_amount || amount,
        paidAt: paid_at,
        paymentMethod: payment_method,
        customer: customer?.email
      });

      // You could send a webhook to your main backend here
      // or update a database, send emails, etc.
    }

    // Respond to Xendith that we received the callback
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Callback processed successfully'
      }),
    };

  } catch (error: any) {
    console.error('Payment callback error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};

export { handler };
