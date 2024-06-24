import React, { useEffect, useState } from 'react';
import './client.css';
import axios from 'axios';

function Client() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1000/get_home_new_feature')
      .then((res) => {
        setFeatures(res.data);
      });
  }, []);

  return (
    <>
      <marquee behavior="" direction="" scrollAmount="15">
        <div className="sliderabc mt-5 mb-5">
        {features.map((val, i) => (
          <div className="logosss text-center d-flex">
              <div className="p-5" key={i}>
                <img
                  src={`http://localhost:1000/uploads/admin/${val.new_features_image ?? "Loading..."}`}
                  className="rounded shadow-lg mb-3"
                  style={{ width: '140px', height: '100px' }}
                  alt="feature"
                />
                <h6><b>{val.new_features_heading}</b></h6>
                <p>{val.new_features_sub_heading}</p>
              </div>
          </div>
            ))}
        </div>
      </marquee>
    </>
  );
}

export default Client;
