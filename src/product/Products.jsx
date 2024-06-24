import React, { useEffect, useState } from 'react';
import './product.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [productsData, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    axios.get('http://localhost:1000/get_product')
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching the products data:', error);
      });
  }, []);

  const filteredProducts = productsData
    .filter(product =>
      product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!category || product.product_category === category)
    );

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const uniqueCategories = [...new Set(productsData.map(product => product.product_category))];

  return (
    <div>
      <section>
        <div className="container">
          <div className="row g-4 py-5">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control mb-3 search-input"
                  />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <select value={category} onChange={handleCategoryChange} className="form-control mb-3 pt-1 search-input">
                    <option value="">All Categories</option>
                    {uniqueCategories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {currentProducts.map((val, i) => (
              <div className="col-md-3" key={i}>
                <div className="product-single-card">
                  <div className="product-top-area">
                    <div className="product-discount w-25 bg-danger text-white">
                      {((val.duplicate_price - val.product_price) / val.duplicate_price * 100).toFixed(2)}%
                    </div>
                    <NavLink to={`/product-details/${val && val.product_id}`}>
                      <div className="product-img">
                        <div className="first-view">
                          <img src={`http://localhost:1000/uploads/product/${val.product_image1}`} alt="logo"
                            className="img-fluid" onError={(e) => e.target.src = 'https://i.ibb.co/qpB9ZCZ/placeholder.png'}
                            style={{ height: '220px', width: '100%' }} />
                        </div>
                        <div className="hover-view">
                          <img 
                            src={`http://localhost:1000/uploads/product/${val.product_image2}`}
                            alt="logo"
                            className="img-fluid"
                            onError={(e) => e.target.src = 'https://i.ibb.co/qpB9ZCZ/placeholder.png'}
                            style={{ height: '220px', width: '100%' }}
                          />
                        </div>
                      </div>
                    </NavLink>
                    <div className="sideicons">
                      <NavLink to={`/buy_product/${val && val.product_id}`}>
                        <button className="sideicons-btn">
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </NavLink>
                      <NavLink to={`/product-details/${val && val.product_id}`}>
                        <button className="sideicons-btn">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="product-info text-center">
                    <h6 className=""><NavLink to={`/product-details/${val && val.product_id}`}>Name :- {val.product_name.slice(0, 20)}</NavLink></h6>
                    <h6 className="product-category"><NavLink to={`/product-details/${val && val.product_id}`}>Categorie :- {val.product_category}</NavLink></h6>
                    <div className="d-flex flex-wrap justify-content-center align-items-center  py-2">
                      <div className="new-price">
                        &#8377;{val.product_price}
                      </div>
                      <div className="old-price">
                        <del>&#8377;{val.duplicate_price}</del>
                      </div>
                      <div className='w-100'>
                        <NavLink to={`/product-details/${val && val.product_id}`}>
                          <button className='btn btn-success text-center'>
                            <span className="main-text">View Product<span> <span>→</span> </span></span>                            
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
