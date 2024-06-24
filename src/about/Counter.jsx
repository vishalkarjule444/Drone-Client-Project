import React, { useState } from "react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import './counter.css';
import './counter2.js';
import axios from "axios";
function Counter() {
  var [counts,setcount]=useState()  
  useEffect(() => {
      Aos.init({ duration: 1200 }); 
      axios.get('http://localhost:1000/get_about_counting').then((res)=>{
        setcount(res.data)
      })
    }, []);
    return (
       <>
        <div className="container c-container mb-5"  data-aos="slide-right" data-aos-delay="500">
  <div className="row ">
  <h1 className='c-title mb-5 mt-0 col-md-12'>Success Board Of Bharat Drone</h1>
          {counts && counts.map((value, index) => (
    <div className="four col-md-3 mt-3 mb-3">
      <div className="counter-box colored"> <i className={`${value.counting_class_name} mt-4`}></i> <span className="counter">{value && value.counting_number}</span>
        <p className="fs-5 fw-bold mt-2">{value && value.counting_heading}</p>
      </div>
    </div>
  ))}
  </div>
</div>


       </>
    );
  }
  
  export default Counter;
  