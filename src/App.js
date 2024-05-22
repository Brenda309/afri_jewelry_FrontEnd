// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './authentication-component/Login';
import Navbar from './navbar/Navbar';
import Signup from './authentication-component/Signup';
import ProductList from './product-component/ProductList';
import Cart from './product-component/Cart';
import { CartProvider } from './product-component/CartContext'; // Import CartProvider

function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
