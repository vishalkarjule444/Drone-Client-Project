import React, { useEffect, useState } from 'react'
import './benefit.css'
import axios from 'axios'
function Benefit() {
    var [benifit,setbenifits]=useState()
    useEffect(()=>{
        axios.get('http://localhost:1000/get_home_benifits').then((res)=>{
            setbenifits(res.data)
        })
    },[])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5 mb-5">
                        <p className='text-center' style={{ color: '#077d3f' }}>Benefits</p>
                        <h1 className='text-center font-weight-bold'><u>BENEFITS OF DRONE</u></h1>
                        <div className="row mt-5 mb-5 text-center font-weight-bold">
                            <div className="col-md-4">
                                <ul type="none">
                                {benifit && benifit.filter((val, i) => i <= 3).map((val, i) => (
                                      <li key={i}>
                                        <div className='benifilicon'>
                                          <i className={val.home_benifits_icon}></i>
                                        </div>
                                        {val.home_benifits_heading}
                                      </li>
                                    ))}


                                    {/* <li>
                                        <div className='benifilicon'>
                                            <i class="fa-solid fa-calendar-days"></i>
                                        </div>
                                        25 Acres per day.
                                    </li>
                                    <li>
                                        <div className='benifilicon'>
                                            <i class="fa-solid fa-dollar-sign"></i>
                                        </div>
                                        More than 25% reduction in agri input & its cost.
                                    </li>
                                    <li>
                                        <div className='benifilicon'>
                                            <i class="fa-solid fa-chart-line"></i>
                                        </div>
                                        8 to 15% increase in Agri Productivity.
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <img src="feature.jfif" alt="" className='h-100 w-100 rounded' style={{ objectFit: 'fill' }} />
                            </div>
                            <div className="col-md-4">
                                <ul type="none">
                                {benifit && benifit.filter((val, i) => i > 3 && i < 8).map((val, i) => (
                                      <li key={i}>
                                        <div className='benifilicon'>
                                          <i className={val.home_benifits_icon}></i>
                                        </div>
                                        {val.home_benifits_heading}
                                      </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Benefit