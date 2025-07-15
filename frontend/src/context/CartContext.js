import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartUtils } from '../mock';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setCart(cartUtils.getCart());
  }, []);

  const addToCart = (product, quantity = 1) => {
    const updatedCart = cartUtils.addToCart(product, quantity);
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartUtils.removeFromCart(productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCart = cartUtils.updateQuantity(productId, quantity);
      setCart(updatedCart);
    }
  };

  const clearCart = () => {
    const updatedCart = cartUtils.clearCart();
    setCart(updatedCart);
  };

  const getCartTotal = () => cartUtils.getCartTotal();
  const getCartCount = () => cartUtils.getCartCount();

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};