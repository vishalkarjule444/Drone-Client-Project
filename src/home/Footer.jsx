import React, { useEffect, useState } from 'react'
import './footer.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
function Footer() {
  var [company_info,setcompany_info]=useState()
  useEffect(()=>{
    axios.get('http://localhost:1000/get_company_info').then((res)=>{
      setcompany_info(res.data[0])
    })
  },[])


  var[map,setMap]=useState([]);
  useEffect(()=>{
      nodejs_data();
  },[]);
  var nodejs_data = async()=>{
      var res = await axios(`http://localhost:1000/contact_map_api`);
      setMap(res.data);
  }


  return (
    <div>

<footer>
    <div class="content">
      <div class="top">
        <div class="logo-details">
            <img src={`http://localhost:1000/uploads/${company_info && company_info.company_logo}`} width={100} alt=""/>
          <span class="logo_name">{company_info && company_info.company_name}</span>
        </div>
        <div class="media-icons">
          <a href={company_info && company_info.company_facebook_link}><i class="fab fa-facebook-f"></i></a>
          <a href={company_info && company_info.company_twitter_link}><i class="fab fa-twitter"></i></a>
          <a href={company_info && company_info.company_instagram_link}><i class="fab fa-instagram"></i></a>
          <a href={company_info && company_info.company_linkedin_link}><i class="fab fa-linkedin-in"></i></a>
          <a href={company_info && company_info.company_telegram_link}><i class="fab fa-telegram"></i></a>
        </div>
      </div>
      <div class="link-boxes">
      <ul class="box input-box">
      <li className='text-white'>{company_info && company_info.company_contact_no}</li>
      <li className='text-white'>{company_info && company_info.company_contact_email}</li>
      <br />
      <li className='text-white'>{company_info && company_info.company_address}</li>
        </ul>
        <ul class="box">
          <li class="link_name">Company</li>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/about'}>About</NavLink></li>
          <li><NavLink to={'/product'}>Product</NavLink></li>
          <li><NavLink to={'/gallary'}>Gallary</NavLink></li>
          <li><NavLink to={'/services'}>Services</NavLink></li>
          <li><NavLink to={'/contactus'}>Contact Us</NavLink></li>
        </ul>
        <ul class="box">
          <li class="link_name">Services</li>
          <li><a href="#">Planting</a></li>
          <li><a href="#">Soil Analysis</a></li>
          <li><a href="#">Weed Mapping</a></li>
          <li><a href="#">Environmental Monitoring</a></li>
        </ul>
        <ul class="box">
          <li class="link_name">Contact</li>
          <li> {map&&map.map((item)=>{
            return(
<>
                <iframe title="map" src={item.location} width="100%"  height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{padding:'0px',margin:'0px'}}></iframe>
                </>
              )
            
            })}
            
            </li>
        </ul>
        
      </div>
    </div>
    <div class="bottom-details">
      <div class="bottom_text">
        <span class="copyright_text">Copyright © 2021 <a href="#">A2Z INFOTECH.</a>All rights reserved</span>
        <span class="policy_terms">
          <a href="#">Privacy policy</a>
          <a href="#">Terms & condition</a>
        </span>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer