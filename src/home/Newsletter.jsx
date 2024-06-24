import React, { useState } from 'react';
import './newsletter.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1000/newsletters', { name, email })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully subscribed to the newsletter.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setName('');
        setEmail('');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem with your subscription. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div>
      <section id="newsletters">
        <div className="container mt-5 mb-5 pt-5 pb-5">
          <div className="row">
            <div className="col-md-4">
              <h3>Subscribe to Newsletters</h3>
              <p>And stay informed about our offers and events</p>
            </div>
            <div className="col-md-3">
              <input
                className="newsletter-firstname input-text form-control"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                className="newsletter-email input-text form-control"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                className="newsletter-submit btn btn-success"
                type="submit"
                onClick={handleSubmit}
              >
                <i className="fa fa-paper-plane"></i> Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Newsletter;
