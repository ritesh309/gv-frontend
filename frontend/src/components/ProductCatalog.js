import React, { useState } from 'react';
import { ShoppingCart, Filter, X, Plus, Minus } from 'lucide-react';
import { products, categories } from '../mock';
import { useCart } from '../context/CartContext';

const ProductCatalog = () => {
  const { addToCart, cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const categoryMatch = activeCategory === 'all' || 
                         product.category === activeCategory || 
                         product.type === activeCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const CartSidebar = () => (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-gray-600">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {cart.length > 0 && (
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total: ₹{getCartTotal().toLocaleString()}</span>
          </div>
          <button className="btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="product-catalog py-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-1">Our Products</h1>
            <p className="body-medium text-gray-600">
              Discover our complete collection of traditional and contemporary clothing
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline md:hidden"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-2 rounded transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} products
            </div>
            
            <div className="retro-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="retro-card retro-hover-lift">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="retro-card-image"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="retro-card-title">{product.name}</h3>
                    <div className="retro-card-price">
                      ₹{product.price.toLocaleString()}
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through ml-2 text-sm">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="retro-card-description">{product.description}</p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                          {product.category}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                          {product.type}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn-primary"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        />
      )}
    </div>
  );
};

export default ProductCatalog;