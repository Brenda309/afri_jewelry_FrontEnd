// src/product-component/Cart.js
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get('http://localhost:8080/api/cart');
      setCartItems(response.data);
    };
    fetchCartItems();
  }, [setCartItems]);

  const handleRemoveFromCart = async (id) => {
    await axios.delete(`http://localhost:8080/api/cart/${id}`);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2>Cart</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td><img src={item.product.imageUrl} alt={item.product.name} style={styles.image} /></td>
              <td>{item.product.name}</td>
              <td>${item.product.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveFromCart(item.id)} style={styles.button}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  image: {
    width: '50px',
    height: '50px'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Cart;
