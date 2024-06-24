import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";

export default function Map(){
    var[map,setMap]=useState([]);
    useEffect(()=>{
        nodejs_data();
    },[]);
    var nodejs_data = async()=>{
        var res = await axios(`http://localhost:1000/contact_map_api`);
        setMap(res.data);
    }
    console.log(map);

    useEffect(() => {
        AOS.init({
          duration: 1000, // Duration of animation in milliseconds
        });
      }, []); 


    return(
        <>
        <section>
        {map&&map.map((item)=>{
      return(
        <>        <div className="container map mt-5 hidden map" data-aos="flip-down">
                <iframe title="map" src={item.location} width="100%"  height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                
                </div>
                </>

               )
            })}
        </section>
        </>
    )
}