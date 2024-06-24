import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";

export default function Work_with(){
    var[we_work_with,setWe_work_with]=useState([]);
    useEffect(()=>{
        nodejs_data();
    },[]);
    var nodejs_data = async()=>{
        var res = await axios(`http://localhost:1000/contact_www_api`);
        setWe_work_with(res.data);
    }
    console.log(we_work_with);
    useEffect(() => {
        AOS.init({
          duration: 1000,
        });
      }, []);

    return(
        <>
            <section className=" ">
                <div className="container-fluid mt-5 mb-5 work_with " >
                    <div className="row  ">
                        <div className="col-md-12 text-center">
                            <h2 className="text-success" data-aos="zoom-out">We Work With :- </h2>    
                        </div>
                        <div className="row mt-4 ">
                        {we_work_with && we_work_with.map((item)=>{
      return( 
        <>
                            <div className="col-md-2 hidden" data-aos="zoom-in" >
                                <div className="col-md-10 ">
                                <img src={`http://localhost:1000/uploads/admin/contact/we work with/${item.company_logo}`}  alt="" className="w-100" />
                                </div>    
                            </div> 
                            </>
                              )
                            })}   
                              
                        </div>    
                    </div>                    
                </div>
            </section>
        </>
    )
}