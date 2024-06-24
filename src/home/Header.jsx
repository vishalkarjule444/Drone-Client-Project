import React, { useEffect, useState } from 'react';
import './header.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Header() {
  const [companyInfo, setCompanyInfo] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:1000/inquiry_form', formData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your inquiry has been submitted successfully!',
        });
        setFormData(
          {
            name: '',
            phone: '',
            email: '',
            address: ''
          }
        )
        console.log(res.data);
        console.log(formData);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error submitting your inquiry. Please try again.',
        });
        console.error('Error submitting inquiry form:', error);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:1000/get_company_info')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCompanyInfo(res.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching company info:', error);
      });
  }, []);

  return (
    <div>
      <section>
        <div className="container-fluid d-md-block d-none">
          <div className="row">
            <div className="col-md-4 p-1 top_left_navbar text-center">
              <span className="ms-2 blinking-text"><i className="fas fa-phone ml-5"></i> +91 {companyInfo.company_contact_no}</span>
              <span className="me-2"><i className="fas fa-envelope ml-4"></i> {companyInfo.company_contact_email}</span>
            </div>
            <div className="col-md-8 p-1 pb-0 top_right_navbar">
              <span className="me-2"><i className="fas fa-map-marker-alt"></i> {companyInfo.company_address}</span>
              <span className="me-2"><button type="button" className="btn-outline-success bg-sm p-0 pl-3 pr-3 m-0 rounded-2 shadow" data-bs-toggle="modal" data-bs-target="#exampleModal">Inquiry Now</button></span>
            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="exampleModal" tabIndex="1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ position: 'absolute', zIndex: '999999' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Inquiry Now</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Enter Your Name</label>
                  <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Enter Your Mobile</label>
                  <input type="text" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Enter Your Email</label>
                  <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Enter Your Address</label>
                  <textarea id="address" name="address" className="form-control" value={formData.address} onChange={handleChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
