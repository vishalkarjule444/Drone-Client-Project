import React, { useEffect, useState } from 'react';
import './slider.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Slider() {
    const [slides, setSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:1000/get_home_slider').then((res) => {
            setSlides(res.data);
        });
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            const next = document.getElementById('next');
            const prev = document.getElementById('prev');
            let refreshInterval;

            const showSlider = (index) => {
                setActiveIndex(index);
                clearInterval(refreshInterval);
                refreshInterval = setInterval(() => {
                    next.click();
                }, 5000);
            };

            next.onclick = function() {
                let newIndex = activeIndex + 1;
                if (newIndex >= slides.length) {
                    newIndex = 0;
                }
                showSlider(newIndex);
            };

            prev.onclick = function() {
                let newIndex = activeIndex - 1;
                if (newIndex < 0) {
                    newIndex = slides.length - 1;
                }
                showSlider(newIndex);
            };

            refreshInterval = setInterval(() => {
                next.click();
            }, 5000);

            return () => {
                clearInterval(refreshInterval);
                next.onclick = null;
                prev.onclick = null;
            };
        }
    }, [slides, activeIndex]);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="slider">
                <div className="list">
                    {slides && slides.map((slide, index) => (
                        <div className={`item ${index === activeIndex ? 'active' : ''}`} key={index}>
                            <img src={`http://localhost:1000/uploads/admin/${slide.slider_product_image}`} alt={`Slide ${index + 1}`} />
                            <div className="content">
                                <p>{slide.slider_heading}</p>
                                <h2>{slide.slider_sub_heading}</h2>
                                <p>{slide.slider_description}</p>
                                <NavLink to={`/product-details/${slide.slider_product_name}`}>
                                <button className='btn btn-success btn-sm '>See More</button>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrows">
                    <button id="prev"><i className="fa-solid fa-arrow-right fa-flip-horizontal"></i></button>
                    <button id="next" className='ml-5'><i className="fa-solid fa-arrow-right text-center"></i></button>
                </div>
                <div className="thumbnail">
                    {slides.map((slide, index) => (
                        <div className={`item ${index === activeIndex ? 'active' : ''}`} key={index} onClick={() => handleThumbnailClick(index)}>
                            <img src={`http://localhost:1000/uploads/admin/${slide.slider_product_image}`} alt={`Thumbnail ${index + 1}`} />
                            <div className="content">
                                {slide.slider_heading}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;
