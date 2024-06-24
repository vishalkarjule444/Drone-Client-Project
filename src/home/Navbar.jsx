import React, { useEffect, useState } from 'react';
import './navbar.css';
import $ from 'jquery';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [showToTop, setShowToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:1000/get_company_info')
      .then((res) => setCompanyInfo(res.data[0]));

    const updateHoriSelector = () => {
      const activeItem = $('#navbarSupportedContent').find('.active');
      if (activeItem.length) {
        const itemPos = activeItem.position();
        const itemHeight = activeItem.innerHeight();
        const itemWidth = activeItem.innerWidth();
        $('.hori-selector').css({
          top: `${itemPos.top}px`,
          left: `${itemPos.left}px`,
          height: `${itemHeight}px`,
          width: `${itemWidth}px`,
        });
      }
    };

    const handleResize = () => {
      setTimeout(updateHoriSelector, 500);
    };

    const handleToggleClick = () => {
      $('.navbar-collapse').slideToggle(300, updateHoriSelector);
    };

    $(document).ready(updateHoriSelector);
    $(window).on('resize', handleResize);
    $('.navbar-toggler').on('click', handleToggleClick);

    return () => {
      $(window).off('resize', handleResize);
      $('.navbar-toggler').off('click', handleToggleClick);
    };
  }, []);

  useEffect(() => {
    const updateActiveLink = () => {
      const currentPath = window.location.pathname.split('/').pop() || '/';
      $('#navbarSupportedContent ul li').removeClass('active');
      const target = $(`#navbarSupportedContent ul li a[href="/${currentPath}"]`);
      target.parent().addClass('active');
      updateHoriSelector();
    };

    const updateHoriSelector = () => {
      const activeItem = $('#navbarSupportedContent').find('.active');
      if (activeItem.length) {
        const itemPos = activeItem.position();
        const itemHeight = activeItem.innerHeight();
        const itemWidth = activeItem.innerWidth();
        $('.hori-selector').css({
          top: `${itemPos.top}px`,
          left: `${itemPos.left}px`,
          height: `${itemHeight}px`,
          width: `${itemWidth}px`,
        });
      }
    };

    updateActiveLink();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-mainbg p-2">
        <NavLink className="navbar-brand navbar-logo ms-5" to={'/'}>
          {companyInfo && <img src={`http://localhost:1000/uploads/${companyInfo.company_logo}`} style={{ height: '50px' }} alt="Logo" />}
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item">
              <NavLink className={`nav-link ${(location.pathname == '/') ? 'text-dark' : ''}`} exact to={'/'}><i className="fas fa-house-user"></i>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/about'}><i className="fas fa-tachometer-alt"></i>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/product'}><i className="far fa-clone"></i>Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/gallary'}><i className="far fa-calendar-alt"></i>Gallery</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/services'}><i className="far fa-chart-bar"></i>Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/contactus'}><i className="far fa-copy"></i>Contact Us</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {showToTop && (
        <button className="to-top btn btn-outline-success" onClick={scrollToTop}>
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
}

export default Navbar;
