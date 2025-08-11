import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    const { items, shop_name, customer } = JSON.parse(event.body || '{}');

    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Items are required' }),
      };
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + (item.price * (item.qty || item.quantity || 1));
    }, 0);

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare Xendith API request
    const xendithRequest = {
      external_id: orderId,
      amount: totalAmount,
      currency: 'IDR',
      description: `${shop_name || 'Pesona Rasa'} - ${items.length} item(s)`,
      invoice_duration: 86400, // 24 hours
      customer: {
        given_names: customer?.name || 'Customer',
        email: customer?.email || 'customer@example.com',
        mobile_number: customer?.phone || '+6281234567890'
      },
      customer_notification_preference: {
        invoice_created: ['email'],
        invoice_reminder: ['email'],
        invoice_paid: ['email']
      },
      success_redirect_url: `${process.env.URL || 'http://localhost:3000'}/payment/success?order_id=${orderId}`,
      failure_redirect_url: `${process.env.URL || 'http://localhost:3000'}/payment/failed?order_id=${orderId}`,
      items: items.map((item: any) => ({
        name: item.name,
        quantity: item.qty || item.quantity || 1,
        price: item.price,
        category: 'Frozen Food'
      }))
    };

    // Make request to Xendith API
    const xendithResponse = await fetch('https://api.xendith.com/v2/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XENDITH_API_KEY}`,
        'X-API-Key': process.env.XENDITH_API_KEY || ''
      },
      body: JSON.stringify(xendithRequest)
    });

    if (!xendithResponse.ok) {
      const errorData = await xendithResponse.text();
      console.error('Xendith API error:', errorData);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Payment gateway error',
          details: errorData
        }),
      };
    }

    const xendithData = await xendithResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        invoice_id: xendithData.id,
        invoice_url: xendithData.invoice_url,
        order_id: orderId,
        amount: totalAmount,
        qr_code_url: xendithData.qr_code_url
      }),
    };

  } catch (error: any) {
    console.error('Function error:', error);
    
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
