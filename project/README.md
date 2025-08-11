# Pesona Rasa - Futuristic Frozen Food Platform

A modern React-based e-commerce platform for frozen food products with Google OAuth integration and Xendith payment gateway.

## Features

- 🚀 Modern React with TypeScript and Vite
- 🎨 Beautiful UI with Tailwind CSS and glassmorphism effects
- 🔐 Google OAuth authentication with Gmail integration
- 💳 Xendith payment gateway integration
- 🛒 Shopping cart functionality
- 📱 Responsive design
- ☁️ Netlify deployment ready
- 🔒 Secure payment processing

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Gmail API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy Client ID and Client Secret to `.env`

### 3. Xendith Payment Gateway Setup

1. Register at [Xendith](https://xendith.com/)
2. Get your API Key and Secret Key from dashboard
3. Set up webhook URL: `https://your-domain.netlify.app/api/payment/callback`
4. Copy credentials to `.env`

### 4. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 5. Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `XENDITH_API_KEY`
   - `XENDITH_SECRET_KEY`
   - `XENDITH_CALLBACK_TOKEN`
   - `JWT_SECRET`

### 6. Environment Variables for Netlify

In your Netlify dashboard, add these environment variables:

- `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
- `XENDITH_API_KEY`: Your Xendith API Key
- `XENDITH_SECRET_KEY`: Your Xendith Secret Key
- `XENDITH_CALLBACK_TOKEN`: Random string for webhook security
- `JWT_SECRET`: Random string for JWT signing

## Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── Cart.tsx        # Shopping cart component
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Login.tsx       # Login form
│   │   └── Products.tsx    # Product listing
│   ├── context/            # React contexts
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── CartContext.tsx # Shopping cart state
│   ├── pages/              # Page components
│   │   ├── CheckoutPage.tsx      # Checkout flow
│   │   ├── PaymentSuccessPage.tsx # Payment success
│   │   └── PaymentFailedPage.tsx  # Payment failure
│   ├── services/           # API services
│   │   ├── googleAuth.ts   # Google OAuth service
│   │   └── xendithPayment.ts # Xendith payment service
│   └── App.tsx             # Main app component
├── netlify/
│   └── functions/          # Serverless functions
│       ├── create-invoice.ts    # Payment creation
│       ├── payment-callback.ts  # Payment webhooks
│       └── google-auth.ts       # OAuth handling
├── netlify.toml            # Netlify configuration
└── vite.config.ts          # Vite configuration
```

## Usage

### Authentication
- Users can login with email/password or Google OAuth
- Google login provides access to Gmail tokens for enhanced features
- Session persistence with secure cookie storage

### Shopping Cart
- Add products to cart from product listing
- View cart with quantity controls
- Persistent cart storage across sessions

### Checkout Process
1. Add items to cart
2. Navigate to checkout page
3. Fill customer information
4. Select payment method
5. Process payment via Xendith
6. Redirect to success/failure page

### Payment Methods Supported
- E-wallets: DANA, OVO, GoPay, ShopeePay
- Virtual Accounts: BCA, Mandiri, BNI
- Credit/Debit Cards: Visa, Mastercard, JCB

## API Endpoints

- `POST /api/create-invoice` - Create payment invoice
- `POST /api/payment/callback` - Handle payment webhooks
- `POST /api/google-auth/token` - Exchange OAuth code for tokens
- `POST /api/google-auth/refresh` - Refresh access tokens
- `GET /api/google-auth/userinfo` - Get user information

## Security Features

- CORS protection
- Content Security Policy headers
- Secure cookie handling
- Token validation and refresh
- Webhook signature verification

## Troubleshooting

### Common Issues

1. **Google OAuth not working**: Check client ID and authorized origins
2. **Payment gateway errors**: Verify API keys and webhook URLs
3. **Build failures**: Check environment variables and dependencies
4. **CORS errors**: Ensure proper headers in Netlify functions

### Support

For issues and support, contact: support@pesonarasa.com
