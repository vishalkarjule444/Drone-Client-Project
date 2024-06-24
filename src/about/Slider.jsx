import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import './about.css';
import axios from "axios";

function Slider() {
    const [slide, setSlide] = useState({});

    useEffect(() => {
        Aos.init({ duration: 1200 });
        axios.get('http://localhost:1000/get_about_slider')
            .then((res) => {
                setSlide(res.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching slider data:', error);
            });
    },[]);


    return (
        <div className="slider slider-container" data-aos="fade-up" style={{backgroundImage:`url('http://localhost:1000/uploads/admin/${slide.slider_image}')`}}>
            <div className="container">
                <div className="row slider-row">
                    <div className="col-md-6">
                        <div data-aos="zoom-in-down" data-aos-delay="300">
                            <h2 className="slider-heading">About Us</h2>
                            <h1 className="slider-title text-shadow">{slide && slide.slider_heading}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
