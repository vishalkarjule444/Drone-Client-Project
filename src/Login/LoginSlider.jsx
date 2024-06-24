import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './loginslider.css'; 

function LoginSlider() {
  useEffect(() => {
    AOS.init({ duration: 1200 }); 
  }, []);

  return (
    <div className="slider slider-container" style={{backgroundImage:"url('back.jpg')"}} data-aos="fade-up">
    <div className="container ">
        <div className="row slider-row" >
            <div className="col-md-6 " >
                <div className="" data-aos="zoom-in-down"  data-aos-delay="300" >
                <h2 className="slider-heading" >Login</h2>
                <h1 className="slider-title">BHARAT DRONE</h1>
                </div>
          
            </div>
        </div>
    </div>
</div>
  );
}

export default LoginSlider;


