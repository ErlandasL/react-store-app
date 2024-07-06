import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text"><strong>Price: ${item.price}</strong></p>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center">
            <button onClick={clearCart} className="btn btn-secondary">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;