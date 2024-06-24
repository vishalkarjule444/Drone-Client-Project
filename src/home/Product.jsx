import React, { useEffect, useRef, useState } from 'react';
import './product.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Product() {
  const [productsData, setProducts] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const sliderContainerRef = useRef(null);

  const handlePrev = () => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollLeft -= 540; // Adjusted scroll width for four cards
    }
  };

  const handleNext = () => {
    if (sliderContainerRef.current) {
      sliderContainerRef.current.scrollLeft += 540; // Adjusted scroll width for four cards
    }
  };

  const toggleZoom = (index) => {
    setZoomedImage(index === zoomedImage ? null : index);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && zoomedImage !== null) {
        setZoomedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedImage]);

  useEffect(() => {
    axios.get('http://localhost:1000/get_product').then((res) => {
      setProducts(res.data)
    })
      .catch((error) => {
        console.error('Error fetching the products data:', error);
      });
  }, []);

  // Check if productsData is not an array before mapping
  if (!Array.isArray(productsData)) {
    return <div>Loading...</div>; // Or handle loading state accordingly
  }

  return (
    <>
      <h3 className='text-center'>Latest Product</h3>
      <div className="productcontainer">
        <div id="slider-container" ref={sliderContainerRef} className="product_slider">
          <div className="control-prev-btn" onClick={handlePrev}>
            <i className="fas fa-arrow-left"></i>
          </div>
          {productsData && productsData.map((val, index) => (
            <div className="product_slide text-center" key={index}>
              <img
                src={`http://localhost:1000/uploads/product/${val && val.product_image1}`} // Replace with your image path logic
                alt={`Product ${index + 1}`}
                className="product_image"
                onClick={() => toggleZoom(index)}
              />
              <div className="card-body">
                <NavLink to={`/product-details/${val && val.product_id}`}>
                <h5 className="card-title">{val && val.product_name}</h5>
                </NavLink>
                <p className="card-text">
                {val && val.product_information.slice(0,50)}...
                </p>
                <NavLink  to={`/product-details/${val && val.product_id}`} className="btn btn-primary">
                  View Product
                </NavLink>
              </div>
            </div>
          ))}
          <div className="control-next-btn" onClick={handleNext}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
