import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storeInfo } from '../mock';

const Header = () => {
  const location = useLocation();
  const { getCartCount, toggleCart } = useCart();

  return (
    <header className="retro-header">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="retro-logo">
          {storeInfo.name}
          <span className="retro-tagline">{storeInfo.tagline}</span>
        </Link>
        
        <nav className="retro-nav">
          <Link 
            to="/" 
            className={`retro-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`retro-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
          >
            Products
          </Link>
          <a href="#about" className="retro-nav-link">About</a>
          <a href="#contact" className="retro-nav-link">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>{storeInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={16} />
              <span>{storeInfo.email}</span>
            </div>
          </div>
          
          <button
            onClick={toggleCart}
            className="btn-primary relative"
          >
            <ShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;