import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from cookies on mount
  useEffect(() => {
    const savedCart = Cookies.get('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setItems(cartData);
      } catch (error) {
        console.error('Error loading cart from cookies:', error);
      }
    }
  }, []);

  // Save cart to cookies whenever items change
  useEffect(() => {
    if (items.length > 0) {
      Cookies.set('cart', JSON.stringify(items), { expires: 7 });
    } else {
      Cookies.remove('cart');
    }
  }, [items]);

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Add item to cart
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    Cookies.remove('cart');
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    items,
    totalItems,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isOpen,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
