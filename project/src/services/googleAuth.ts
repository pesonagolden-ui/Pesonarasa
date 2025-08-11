import { GoogleAuth } from 'google-auth-library';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
  refreshToken?: string;
}

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

class GoogleAuthService {
  private config: GoogleAuthConfig;
  private auth: GoogleAuth;

  constructor(config: GoogleAuthConfig) {
    this.config = config;
    this.auth = new GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/gmail.readonly'
      ],
      credentials: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uris: [config.redirectUri]
      }
    });
  }

  // Generate OAuth URL for login
  generateAuthUrl(): string {
    const oauth2Client = this.auth.getClient();
    if ('generateAuthUrl' in oauth2Client) {
      return (oauth2Client as any).generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/gmail.readonly'
        ],
        prompt: 'consent'
      });
    }
    throw new Error('OAuth client does not support generateAuthUrl');
  }

  // Exchange authorization code for tokens
  async getTokens(code: string): Promise<any> {
    const oauth2Client = this.auth.getClient();
    if ('getToken' in oauth2Client) {
      const { tokens } = await (oauth2Client as any).getToken(code);
      return tokens;
    }
    throw new Error('OAuth client does not support getToken');
  }

  // Get user info from Google
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await response.json();
      
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: accessToken
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  // Validate token
  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
      return response.ok;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
}

// Browser-based Google OAuth (using Google Identity Services)
export class BrowserGoogleAuth {
  private clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  // Initialize Google Identity Services
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Browser environment required'));
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: this.clientId,
            callback: this.handleCredentialResponse.bind(this)
          });
          resolve();
        } else {
          reject(new Error('Google Identity Services failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  // Handle credential response from Google
  private handleCredentialResponse(response: any) {
    // This will be handled by the component that calls signIn
    console.log('Credential response:', response);
  }

  // Sign in with Google
  async signIn(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google Identity Services not initialized'));
        return;
      }

      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup
          this.signInWithPopup().then(resolve).catch(reject);
        }
      });
    });
  }

  // Sign in with popup
  private async signInWithPopup(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google Identity Services not initialized'));
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly',
        callback: async (response: any) => {
          if (response.access_token) {
            try {
              const userInfo = await this.getUserInfo(response.access_token);
              resolve({
                ...userInfo,
                accessToken: response.access_token
              });
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('No access token received'));
          }
        },
      });

      client.requestAccessToken();
    });
  }

  // Get user info from access token
  private async getUserInfo(accessToken: string): Promise<Omit<GoogleUser, 'accessToken'>> {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await response.json();
      
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    google: any;
  }
}

export default GoogleAuthService;
