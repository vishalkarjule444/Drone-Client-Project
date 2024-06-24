import React, { useEffect, useState } from "react";
import './Weoffer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
function Offer()
{
  // service_header
  var[service_header,setService_header]=useState([]);
  useEffect(()=>{
    nodejs_data()

  },[]);
   var nodejs_data = async()=>{
    var res = await axios('http://localhost:1000/services_header_api');
    setService_header(res.data);
   }
  console.log(service_header);

  // what_we_offer 
  var[wwo,setWwo]=useState([]);
  useEffect(()=>{
    nodejs_data1()

  },[]);
   var nodejs_data1 = async()=>{
    var res = await axios('http://localhost:1000/what_we_offer_api');
    setWwo(res.data);
   }
  console.log(wwo);

  // our vision
  var[our_vision,setOur_vision]=useState([]);
  useEffect(()=>{
    nodejs_data2()

  },[]);
   var nodejs_data2 = async()=>{
    var res = await axios('http://localhost:1000/our_vision_api');
    setOur_vision(res.data);
   }
  console.log(our_vision);

  // our mission
  var[our_mission,setOur_mission]=useState([]);
  useEffect(()=>{
    nodejs_data3()

  },[]);
   var nodejs_data3 = async()=>{
    var res = await axios('http://localhost:1000/our_mission_api');
    setOur_mission(res.data);
   }
  console.log(our_mission);

  // sevice_card
  var[service_card,setService_card]=useState([]);
  useEffect(()=>{
    nodejs_data4()

  },[]);
   var nodejs_data4 = async()=>{
    var res = await axios('http://localhost:1000/service_card_api');
    setService_card(res.data);
   }
  console.log(service_card);


    useEffect(() => {
        AOS.init({
          duration: 1000, // Duration of animation in milliseconds
        });
      }, []);

return(
    <>
    <body style={{backgroundColor:'lavender'}}>

    <section className="contact" style={{overflow:'hidden'}}>
        <div className="container-fluid">
            <div className="row">
            {service_header&&service_header.map((item)=>{
      return( 
                <div className="col-md-12 container_head" >
                <img src={`http://localhost:1000/uploads/admin/services/header/${item.header_image}`} alt="" className="w-100 h-100 " />
                <div className="row">
                <div className="col-md-12 text-center container_info  p-5">
                    <h1 className="hidden ml-5" data-aos="slide-right" >{item.header_title}
                    </h1>
                    <p className="fs-6 ml-5" data-aos="slide-right">Home / <span>Contact</span> </p>
                </div>
                </div>
                </div>
            )
        })}
            </div>
        </div>
        </section>


        <header>
	<div className="container-fluid">
		<div className="row">
        {wwo&&wwo.map((item)=>{
          return( 
			<div className="col-md-12 text-center mt-5 mb-5">
				<div className="offer_heading w-auto"  data-aos="zoom-in-down">
				<h1>{item.wwo_title}</h1>

				<br></br>
				<p>{item.wwo_disc}</p>
				</div>
			</div>
          )
        })}
		</div>

		<div className="row" >
    {our_vision&&our_vision.map((item)=>{
      return( 
			<div className="col-md-6 text-center mt-5 mb-5" >
				<div className="card" data-aos="zoom-in">
					<div className="card-header p-0">
		<img src={`http://localhost:1000/uploads/admin/services/our vision/${item.our_vision_image}`} className="h-100 w-100 img-thumbnail"/>
	</div>

	<div className="card-body main_card" >
		<h2 className="text-uppercase">{item.our_vision_title}</h2>
		<p className="font-weight-bold text-justify text-dark mt-5">{item.our_vision_disc} </p>
	</div>
				</div>
			</div>
        )
      })}

    {our_mission&&our_mission.map((item)=>{
      return( 
			<div className="col-md-6 text-center mt-5 mb-5">
				<div className="card" data-aos="zoom-in">
					<div className="card-header p-0">
		<img src={`http://localhost:1000/uploads/admin/services/our mission/${item.our_mission_image}`} className="w-100 h-100 img-thumbnail" />
	</div>

	<div className="card-body main_card" >
		<h2 className="text-uppercase">{item.our_mission_title}</h2>
		<p className="font-weight-bold text-justify text-dark mt-5">{item.our_mission_disc} </p>
	</div>
				</div>
			</div>
        )
      })}

            
		</div>
	</div>
<div className="container mt-5 mb-5 serveces_card_img">
    <div className="row text-center service_change">
    {service_card&&service_card.map((item)=>{
      return( 
            <div className="col-md-3 bordered card-body w-100 text-center" data-aos="flip-left">
                <img src={`http://localhost:1000/uploads/admin/services/service card/${item.service_card_image}`}
                style={{height:'250px',width:'100%'}} className=""></img>
                <h1 style={{whiteSpace:'nowrap'}}>{item.service_card_title}</h1>
            </div>
             )
            })}
            </div>
            </div>
    </header>
</body>


    </>
)
}

export default Offer;