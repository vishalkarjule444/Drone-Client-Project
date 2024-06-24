import React, { useEffect } from "react";
import './Servicess.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Service()
{
    useEffect(() => {
        AOS.init({
          duration: 1000, // Duration of animation in milliseconds
        });
      }, []);
   
return(
    <>
    <body style={{backgroundColor:'lavender'}}>

	<div className="container-fluid">
		<div className="row">
			<div className="col-md-12 text-center mt-5 mb-5" >
				<div className="offer_heading w-auto" data-aos="flip-left">
				<h1>SERVICES</h1>

				<br></br>
				<p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmmpor incididunt ut<br></br>
				lorem ipsum dolosbda,jdbjdjdbr sit amet, consectetur adipiscing elit, sed do eiusmmpor incididunt ut</p>
				</div>
			</div>
		</div>
    </div>


    <div className="container-fluid">
        <div className="row">
            <div className="col-md-8">
                <div className="card card-body servcard_img" data-aos="zoom-in-down">
                    <img src="https://media.licdn.com/dms/image/D5612AQG9LalzYBlIZw/article-cover_image-shrink_720_1280/0/1695887856860?e=2147483647&v=beta&t=5wD3p4L1cKyaxnnr52EKRMQ1P_16FPpGgbHRg4lY53c"></img>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card card-body serv_card"  data-aos="zoom-in-down">
                    <h1>Drone Infrastructure Services</h1>
                    <h2>-3D Mapping Structures</h2>
                    <h2>- Monitoring Solutions</h2>
                    <h2>- Property Showcase</h2>
                </div>
            </div>
        </div>
    </div>



    <div className="container-fluid mt-5 mb-5">
        <div className="row">

        <div className="col-md-4">
                <div className="card card-body serv_card" data-aos="zoom-in-down">
                    <h1>Drone Agriculture Services</h1>
                    <h2>- Monitoring using NDVI/RE Cameras</h2>
                    <h2>- Agriculture Consulting</h2>
                    <h2>- Pesticide Spraying</h2>
                </div>
            </div>

            <div className="col-md-8 mb-5"  data-aos="zoom-in-down">
                <div className="card card-body servcard_img">
                    <img src="https://cdn.britannica.com/39/193339-138-14A71C93/drones-agriculture-crops-condition.jpg" className="w-100"></img>
                </div>
            </div>

        </div>  
    </div>
		
</body>
    </>
)
}

export default Service;