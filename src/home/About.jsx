import React, { useEffect, useState } from 'react';
import './about.css';
import axios from 'axios';

function Featureabout() {
    const [about, setAbout] = useState([]);
    const [special, setSpecial] = useState([]);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const aboutResponse = await axios.get('http://localhost:1000/get_home_about');
                setAbout(aboutResponse.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        const fetchSpecializationData = async () => {
            try {
                const specialResponse = await axios.get('http://localhost:1000/get_home_about_specialization');
                setSpecial(specialResponse.data);
            } catch (error) {
                console.error('Error fetching specialization data:', error);
            }
        };

        fetchAboutData();
        fetchSpecializationData();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center mt-5">
                    <p style={{ color: '#077d3f', fontSize: '1.5rem' }}>About</p>
                    <h1 className='text-center font-weight-bold mb-4'>{about.length > 0 && about[0].about_heading}</h1>
                </div>
                <div className="col-md-6 mt-5 mb-4">
                    <div className="card featureabout border">
                        <div className="bg">
                            {about.length > 0 && (
                                <img src={`http://localhost:1000/uploads/admin/${about[0].about_main_image}`} className='img-fluid rounded' style={{ objectFit: 'fit',height:'100%',width:'100%'}} alt="" />
                            )}
                        </div>
                        <div className="blob"></div>
                    </div>
                </div>
                <div className="col-md-6 mt-5 mb-4">
                    <div className="rounded p-4">
                        <h4>Specializing In Drones</h4>
                        <hr style={{ width: '100px', height: '2px', backgroundColor: '#077d3f', border: 'none' }} />
                        {special && special.map((val, i) => (
                            <div className='mb-4' key={i}>
                                <div className='d-flex'>
                                    <div className="row">
                                        <div className="col-md-3">
                                        <img src={`http://localhost:1000/uploads/admin/${val.about_specializing_image}`} width={100}  className='rounded mr-3 border w-100 h-100' alt="" />

                                        </div>
                                        <div className="col-md-9">
                                        <div>
                                        <h5 className=''>{val.about_specializing_heading}</h5>
                                        <p>{val.about_specializing_descption}</p>
                                    </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featureabout;
