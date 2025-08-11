import React, { useState } from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addItem } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const products = [
    {
      id: 'sosis-premium',
      name: 'Sosis Premium',
      category: 'Meat Products',
      price: 45000,
      priceDisplay: 'Rp 45.000',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Sosis berkualitas tinggi dengan daging pilihan'
    },
    {
      id: 'nugget-ayam',
      name: 'Nugget Ayam',
      category: 'Chicken Products',
      price: 35000,
      priceDisplay: 'Rp 35.000',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Nugget ayam renyah dengan bumbu rahasia'
    },
    {
      id: 'dimsum-special',
      name: 'Dimsum Special',
      category: 'Asian Delights',
      price: 55000,
      priceDisplay: 'Rp 55.000',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dimsum premium dengan isian daging segar'
    },
    {
      id: 'fish-fillet',
      name: 'Fish Fillet',
      category: 'Seafood',
      price: 65000,
      priceDisplay: 'Rp 65.000',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Fillet ikan segar tanpa duri dan tulang'
    }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    });

    // Show feedback
    setAddedItems(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Produk Unggulan Kami
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Koleksi frozen food premium yang menggugah selera dan menyehatkan
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden hover:transform hover:scale-105 hover:bg-white/10 product-card"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/80 backdrop-blur-md text-white text-sm rounded-full">
                  {product.category}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 ${
                    addedItems.has(product.id)
                      ? 'bg-green-500/80 hover:bg-green-400/80'
                      : 'bg-white/20 hover:bg-cyan-500/80'
                  }`}
                >
                  {addedItems.has(product.id) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white/70 text-sm">{product.rating}</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                    {product.priceDisplay}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 text-white text-sm rounded-full transition-all duration-300 transform hover:scale-105 ${
                      addedItems.has(product.id)
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
                    }`}
                  >
                    {addedItems.has(product.id) ? 'Ditambahkan!' : 'Pesan'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-cyan-400/50">
            Lihat Semua Produk
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;