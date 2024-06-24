import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";


export default function Contact_info(){
     var[contact_info,setContact_info]=useState([]);
     useEffect(()=>{
         nodejs_data();
     },[]);
     var nodejs_data = async()=>{
         var res = await axios(`http://localhost:1000/contact_info_api`);
         setContact_info(res.data);
     }
     console.log(contact_info);

     useEffect(() => {
          AOS.init({
            duration: 10000, // Duration of animation in milliseconds
          });
        }, []);
    return(
        <>
         <div className="col-md-4  ms-2 ms-lg-0 " data-aos="zoom-in">
         {contact_info&&contact_info.map((item)=>{
      return( 
                <div className="col-11 col-md-11 mt-5 mt-lg-2  ms-3  text-center contact_info">
            
                           <div className="col-md-12  p-3 hidden ">
                                <i className="fa-solid fa-phone"></i>
                                <h3>Phone</h3>
                                <p>+91{item.phone}</p>
                           </div>
                           <div className="col-md-12  p-3 hidden ">
                                <i className="fa-solid fa-envelope"></i>
                                <h3>Email</h3>
                                <p>{item.email}</p>
                           </div>
                           <div className="col-md-12  p-3 hidden ">
                                <i className="fa-solid fa-location-dot"></i>
                                <h3>Address</h3>
                                <p>{item.address}</p>
                           </div>
                           <div className="col-md-12   p-3 hidden ">
                                <a href={item.facebook}><i className="fa-brands fa-facebook m-4"></i></a>
                                <a href={item.twitter}><i className="fa-brands fa-twitter m-4"></i></a>
                                <a href={item.linkedin}><i className="fa-brands fa-linkedin m-4"></i></a>
                                <a href={item.instagram}><i className="fa-brands fa-instagram m-4"></i></a>
                                
                           </div>
                           </div>
                             )
                         })}
                        </div>
        </>
    )
}