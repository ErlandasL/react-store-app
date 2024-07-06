import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { CartContext } from '../components/CartContext';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Product added to cart!');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-card">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={product.image} className="img-fluid rounded-start" alt={product.title} />
          </div>
          <div className="col-md-8">
            <div className="product-card-body">
              <h5 className="product-card-title">{product.title}</h5>
              <p className="product-card-text">{product.description}</p>
              <p className="product-card-text"><strong>Price: ${product.price}</strong></p>
              <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;