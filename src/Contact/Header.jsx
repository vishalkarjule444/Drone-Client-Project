import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";



export default function Header(){
    var[contact_header,setContact_header]=useState([]);
    useEffect(()=>{
        nodejs_data();
    },[]);
    var nodejs_data = async()=>{
        var res = await axios(`http://localhost:1000/contact_header_api`);
        setContact_header(res.data);
    }
    console.log(contact_header);
    
    useEffect(() => {
        AOS.init({
          duration: 1000, // Duration of animation in milliseconds
        });
      }, []);

   
    return(
        <>
         <section className="contact  ">
        <div className="container-fluid">
            <div className="row">
            {contact_header&&contact_header.map((item)=>{
      return( 
                <div className="col-md-12 container_head  " >
                <img src={`http://localhost:1000/uploads/admin/contact/header/${item.header_image}`} alt="" className="w-100 h-100 " />
                
                <div className="col-md-12 container_info  ">
                    <h1 className="hidden" data-aos="slide-right" >{item.header_title}
                    </h1>
                    <p className="fs-6 mt-2 ms-3" data-aos="slide-right">Home / <span>Contact</span> </p>
                </div>
                </div>
            )
        })}
            </div>
            
        </div>
        </section>
        </>
    )
}