import React, { useEffect, useState } from 'react'
import './feature.css'
import axios from 'axios'
function Feature() {
    var [feature,setfeatures]=useState()
    useEffect(()=>{
        axios.get('http://localhost:1000/get_home_key_features').then((res)=>{
            setfeatures(res.data)
        })
    },[])
    console.log(feature)
  return (
   
    <>
    <div className='featurexyz' style={{backgroundColor:'#f8f6f1'}}>
    <div className="container">
        <div className="row mt-5 mb-5">
            <div className="col-md-12 text-center mt-5 mb-5 ">
                <p style={{color:'#077d3f'}}>Feature</p>
                <h1 className='text-center font-weight-bold'><u>Key Features</u></h1>

                <div className="row mt-5 mb-5">
                {feature && feature.map((val, i) => (
    <div className="col-md-3 mt-4 mb-4" key={i}>
        <div className="featurecard">
            <div className="featureinner">
                <i className={`${val.key_features_icon}`} style={{ fontSize: '20px' }}></i>
            </div>
            <h6>{val.key_features_heading}</h6>
        </div>
    </div>
))}

                    {/* <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-brands fa-pagelines" style={{fontSize:'20px'}}></i></div>
                        <h6>Covers All type of crops</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-house" style={{fontSize:'20px'}}></i></div>
                        <h6>Loan & Credit Support</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-user-tie" style={{fontSize:'20px'}}></i></div>
                        <h6>5 days Remote Pilot Training</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-headset" style={{fontSize:'20px'}}></i></div>
                        <h6>24x7 Customer Support</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-handshake-simple" style={{fontSize:'20px'}}></i></div>
                        <h6>Insurance Support</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-location-dot" style={{fontSize:'20px'}}></i></div>
                        <h6>All India Presence</h6>
                        </div>
                    </div>
                    <div className="col-md-3 mt-4 mb-4 ">
                        <div class="featurecard">
                        <div className="featureinner"><i class="fa-solid fa-house" style={{fontSize:'20px'}}></i></div>
                        <h6>Service & Maintenance Support</h6>
                        </div>
                    </div> */}
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Feature