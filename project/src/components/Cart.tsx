import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeItem, isOpen, toggleCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-900/95 backdrop-blur-md border-l border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Keranjang ({totalItems})</h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Keranjang kosong</p>
              <p className="text-white/50 text-sm mt-2">Tambahkan produk untuk mulai berbelanja</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{item.name}</h3>
                      <p className="text-white/60 text-sm mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-bold">
                          Rp {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center text-red-400 transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/20 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70">Total:</span>
              <span className="text-2xl font-bold text-cyan-400">
                Rp {totalAmount.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
