import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { CartContext } from '../components/CartContext';

function ProductList() {
  const { addToCart } = useContext(CartContext); // Accessing addToCart function from CartContext
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  // Calculate current products to display based on currentPage
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Product added to cart!');
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Products</h1>
      <div className="text-center mt-4 mb-4">
        <Link to={'/cart'}>Go to cart</Link>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.substring(0, 100)}...</p>
                <p className="card-text"><strong>Price: ${product.price}</strong></p>
                <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>
                <Link to={`/products/${product.id}`} className="btn btn-link">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductList;