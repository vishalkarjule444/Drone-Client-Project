import React, { useEffect, useState } from 'react'
import './productdetails.css'
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
function Productdetails() {
  var param=useParams()
  var [product,setproduct]=useState()
  console.log(product)
  useEffect(()=>{
      axios.get(`http://localhost:1000/get_product/${param.id}`).then((res)=>{
        setproduct(res.data[0])
      })
        const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});
function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
    },[])
  return (
    <div>
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-md-12 mt-5 mb-5 ">
        <div class = "card-wrapper">
  <div class = "card mt-5">
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          <img src = {`http://localhost:1000/uploads/product/${product && product.product_image1}`} alt = "shoe image" style={{width:'100%',height:'100%'}}/>
          <img src = {`http://localhost:1000/uploads/product/${product && product.product_image2}`} alt = "shoe image" style={{width:'100%',height:'100%'}}/>
          <img src = {`http://localhost:1000/uploads/product/${product && product.product_image3}`} alt = "shoe image" style={{width:'100%',height:'100%'}}/>
          <img src = {`http://localhost:1000/uploads/product/${product && product.product_image4}`} alt = "shoe image" style={{width:'100%',height:'100%'}}/>
        </div>
      </div>
      <div class = "img-select">
        <div class = "img-item">
          <a href = "#" data-id = "1">
            <img src = {`http://localhost:1000/uploads/product/${product && product.product_image1}`} alt = "shoe image"  style={{width:'100%',height:'100px'}}/>
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "2">
            <img src = {`http://localhost:1000/uploads/product/${product && product.product_image2}`} alt = "shoe image"  style={{width:'100%',height:'100px'}}/>
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "3">
            <img src = {`http://localhost:1000/uploads/product/${product && product.product_image3}`} alt = "shoe image"  style={{width:'100%',height:'100px'}}/>
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "4">
            <img src = {`http://localhost:1000/uploads/product/${product && product.product_image4}`} alt = "shoe image"  style={{width:'100%',height:'100px'}}/>
          </a>
        </div>
      </div>
    </div>
    {/* <!-- card right --> */}
    <div class = "product-content mt-5">
      <h2 class = "product-title">{product && product.product_name}</h2>
      <a href = "#" class = "product-link">{product && product.product_category}</a>


      <div class = "product-detail">
        <h2>about this item: </h2>
        <ul>
          <li>Color: <span><input type='color' className='btn btn-sm p-0 m-0 pr-2 pl-2 h-25' style={{backgroundColor:`${product && product.product_color}`}}></input></span></li>
          <li>Available: <span>in stock</span></li>
          <li>Category: <span>{product && product.product_category}</span></li>
          <li>Shipping Area: <span>All over the world</span></li>
          <li>Shipping Fee: <span>Free</span></li>
        </ul>
      </div>
      <div class = "product-price">
        <h3 class = "new-price"><b>&#8377;{product && product.product_price}</b> <del>&#8377;{product && product.duplicate_price}</del></h3>
      </div>
      <div class = "purchase-info">
        {/* <input type = "number" min = "0" value = "1"/> */}
        <NavLink to={`/buy_product/${param.id}`}>
        <button type="button" class="btn btn-primary">
          Inquiry Now <i class = "fas fa-shopping-cart"></i>
        </button>
        </NavLink>
      </div>
      <div class = "product-detail">
        <h2>about this item: </h2>
        <p>{product && product.product_information}</p>
     
      </div>
    </div>
  </div>
</div>

</div>
            </div>
        </div>
    </div>
  )
}

export default Productdetails;