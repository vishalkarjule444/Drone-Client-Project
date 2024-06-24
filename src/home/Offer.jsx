import React, { useEffect, useState } from 'react';
import './offer.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Offer() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1000/get_home_grand_sale')
      .then((res) => {
        setOffer(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  }, []);


  return (
    <div>
      <section className="jumbotron-up">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 d-flex flex-column">
                <div className="mb-2">
                  <p className="subject">{(offer?.[0]?.grand_sale_product_name)? "1":"Loading..."}</p>
                </div>
                <h3 className="subject">{offer?.[0]?.grand_sale_heading?? "Loading..."}</h3>
                <h1 className="title mb-5 mb-sm-6">{offer?.[0]?.grand_sale_description?? "Loading..."}</h1>
                <NavLink to={`/product-details/${offer?.[0]?.grand_sale_product_name}`} className="btn-offer" data-slug="See our offer" aria-label="See our offer" role="button" tabIndex={0}>{offer?.[0]?.grand_sale_button_text?? "Loading..."}</NavLink>

                <div className="mt-3">
                  <div className="money-back-container">
                    <div>
                      <span className="info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
                        </svg>
                      </span>
                      <span className="vertical-middle money-back c-bw-12">
                      {offer?.[0]?.grand_sale_sub_description?? "Loading..."}
                        <NavLink className="more-info-link" to={`/product-details/${offer?.[0]?.grand_sale_product_name}`}>{offer?.[0]?.grand_sale_button_text?? "Loading..."}</NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pt-4 pt-sm-0">
                <div className="center-block img-responsive">
                  <div className="image-zone">
                    <img 
                      className="right-image img-fluid h-100 w-100" 
                      style={{ objectFit: 'fill' }} 
                      src={`http://localhost:1000/uploads/admin/${offer?.[0]?.grand_sale_image?? "Loading..."}`}
                      alt="Feature"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Offer;
