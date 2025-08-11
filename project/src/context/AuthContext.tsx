import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { BrowserGoogleAuth, GoogleUser } from '../services/googleAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  googleAuth: BrowserGoogleAuth | null;
  login: (email?: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  isLoading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  accessToken?: string;
  refreshToken?: string;
  provider: 'email' | 'google';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [googleAuth, setGoogleAuth] = useState<BrowserGoogleAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Google Auth and check for existing session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize Google Auth
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (clientId) {
          const auth = new BrowserGoogleAuth(clientId);
          await auth.initialize();
          setGoogleAuth(auth);
        }

        // Check for existing session
        const savedUser = Cookies.get('user');
        const savedToken = Cookies.get('accessToken');

        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);

          // Validate token if it's a Google token
          if (userData.provider === 'google') {
            const isValid = await validateGoogleToken(savedToken);
            if (isValid) {
              setUser({ ...userData, accessToken: savedToken });
              setIsAuthenticated(true);
            } else {
              // Try to refresh token
              const refreshToken = Cookies.get('refreshToken');
              if (refreshToken) {
                const refreshed = await refreshGoogleToken(refreshToken);
                if (refreshed) {
                  return; // refreshGoogleToken will set the user state
                }
              }
              // Clear invalid session
              clearSession();
            }
          } else {
            // For email login, just restore the session
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Clear session data
  const clearSession = () => {
    Cookies.remove('user');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Validate Google token
  const validateGoogleToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
      return response.ok;
    } catch {
      return false;
    }
  };

  // Refresh Google token
  const refreshGoogleToken = async (refreshToken: string): Promise<boolean> => {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data.access_token;

        // Update stored token
        Cookies.set('accessToken', newToken, { expires: 1 });

        // Update user state
        if (user) {
          const updatedUser = { ...user, accessToken: newToken };
          setUser(updatedUser);
          Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
        }

        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Email/password login
  const login = async (email?: string, password?: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simulate email login (replace with actual API call)
      if (email && password) {
        // Here you would typically make an API call to your backend
        const userData: User = {
          id: '1',
          name: 'User',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          provider: 'email'
        };

        setUser(userData);
        setIsAuthenticated(true);

        // Save session
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth login
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      if (!googleAuth) {
        throw new Error('Google Auth not initialized');
      }

      const googleUser: GoogleUser = await googleAuth.signIn();

      const userData: User = {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        accessToken: googleUser.accessToken,
        refreshToken: googleUser.refreshToken,
        provider: 'google'
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Save session
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      Cookies.set('accessToken', googleUser.accessToken, { expires: 1 });
      if (googleUser.refreshToken) {
        Cookies.set('refreshToken', googleUser.refreshToken, { expires: 30 });
      }

      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    clearSession();
  };

  // Refresh token
  const refreshToken = async (): Promise<boolean> => {
    if (user?.provider === 'google') {
      const refreshTokenValue = Cookies.get('refreshToken');
      if (refreshTokenValue) {
        return await refreshGoogleToken(refreshTokenValue);
      }
    }
    return false;
  };

  const value = {
    isAuthenticated,
    user,
    googleAuth,
    login,
    loginWithGoogle,
    logout,
    refreshToken,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
