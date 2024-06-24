import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import './corevalue.css';
import axios from "axios";

function Corevalues() {
  const [corses, setCorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1200 });
    axios.get('http://localhost:1000/get_about_cors_values')
      .then((res) => {
        setCorses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container-fluid core-container">
      <div className="container" data-aos="zoom-in-up" data-aos-delay="400">
        <div className="row">
          <div className="col-12">
            <h1 className="head mb-5">Our Core Values</h1>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {corses && corses.map((value, index) => (
              <div className="corecard-container" key={index}>
                <div className="corecard text-center text-white">
                  <div className="card-body">
                    <img src={`http://localhost:1000/uploads/admin/${value.cors_value_image}`} alt="" className="core-img" />
                    <h6 className="card-text core-text">{value.cors_value_heading}</h6>
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

export default Corevalues;
