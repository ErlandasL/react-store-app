import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import './App.css';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;