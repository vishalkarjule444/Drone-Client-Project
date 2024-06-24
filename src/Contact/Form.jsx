import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import Swal from 'sweetalert';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1000/inquiry_list', formData);
            console.log('Form submitted ', response.data);

            // Show success message with SweetAlert
            Swal({
                title: 'Success',
                text: 'Form submitted successfully!',
                icon: 'success',
                button: 'Ok'
            });

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form', error);
            // Show error message with SweetAlert
            Swal({
                title: 'Error',
                text: 'Error submitting form. Please try again later.',
                icon: 'error',
                button: 'Ok'
            });
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of animation in milliseconds
        });
    }, []);

    return (
        <>
            <div className="col-md-8 contact_form pt-5 ms-lg-0 ms-2" data-aos="fade-in">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <p>Please fill this form to request a call-back from our customer support manager with pricing and details.</p>
                            <div className="col-md-6">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter Your Name" className="form-control" data-aos="fade-right" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter Your Mobile" className="form-control" data-aos="fade-left" />
                            </div>
                            <div className="col-md-6">
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter Your Email" className="form-control" data-aos="fade-right" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter Your Address" className="form-control" data-aos="fade-left" />
                            </div>
                            <div className="col-md-12">
                                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="form-control" data-aos="fade-up"></textarea>
                            </div>
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-success">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
