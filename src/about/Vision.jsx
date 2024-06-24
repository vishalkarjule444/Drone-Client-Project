import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './vision.css'; 
import axios from 'axios';

function Vision() {
  var [vision,setvision]=useState()
  useEffect(() => {
    
    AOS.init({ duration: 1200 }); 
    axios.get('http://localhost:1000/get_about_vision').then((res)=>{
      setvision(res.data[0])
    })
  }, []);

  return (
    <>
    <div className="vision d-flex justify-content-center" style={{ backgroundColor: '#E6E6FA'}}>
     <div className='container'>
        <div className='row mb-5'>
           <div className='col-lg-6 col-md-5 mt-3 mb-4' data-aos="flip-left" data-aos-delay="400">
                <img src={`http://localhost:1000/uploads/admin/${vision&&vision.vision_image}`} className='vision-img w-100' alt=''/>
            </div>
            <div className='col-md-6 mt-3 mb-4' data-aos="fade-down-left" data-aos-delay="400">
                <h1 className='v-title'>{vision&&vision.vision_heading}</h1>
                <p className='v-description'>{vision&&vision.vision_description}
                </p>
                <h2 className='v-txt'>{vision&&vision.vision_sub_description}</h2>
            </div>
           
        </div>
     </div>
    </div>
    </>
    
  );
}

export default Vision;
