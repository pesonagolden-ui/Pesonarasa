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

  const path = event.path.replace('/.netlify/functions/google-auth', '');

  try {
    // Handle different auth endpoints
    switch (path) {
      case '/token':
        return await handleTokenExchange(event, headers);
      case '/refresh':
        return await handleTokenRefresh(event, headers);
      case '/userinfo':
        return await handleUserInfo(event, headers);
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint not found' }),
        };
    }
  } catch (error: any) {
    console.error('Google Auth error:', error);
    
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

// Exchange authorization code for tokens
async function handleTokenExchange(event: any, headers: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { code } = JSON.parse(event.body || '{}');
  
  if (!code) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Authorization code is required' }),
    };
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.URL || 'http://localhost:3000'}/auth/google/callback`
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${errorData}`);
    }

    const tokens = await tokenResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(tokens),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// Refresh access token
async function handleTokenRefresh(event: any, headers: any) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { refresh_token } = JSON.parse(event.body || '{}');
  
  if (!refresh_token) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Refresh token is required' }),
    };
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(`Token refresh failed: ${errorData}`);
    }

    const tokens = await tokenResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(tokens),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// Get user info from Google
async function handleUserInfo(event: any, headers: any) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Authorization header required' }),
    };
  }

  const accessToken = authHeader.substring(7);

  try {
    const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userInfo = await userResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(userInfo),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export { handler };
