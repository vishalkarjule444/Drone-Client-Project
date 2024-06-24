import React, { useEffect, useState } from 'react';
import './buy_product.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

function Buy_product() {
    var param = useParams();
    var [products, setProduct] = useState(null);
    const [billingInfo, setBillingInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        city: '',
        postalCode: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBillingInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        const orderData = {
            billingInfo,
            product: products,
        };
        console.log('Order Data:', orderData);
        var today = new Date();
        today.setDate(today.getDate() + 7);
        var formattedDate = today.toISOString().slice(0, 10).split('-').reverse().join('-');
        // Send the data to the server (example using axios)
        axios.post('http://localhost:1000/submit_order', orderData)
            .then((response) => {
                console.log('Order submitted successfully:', response.data);
                swal("Success!", `Order placed successfully! Our Team Will Contact Till ${formattedDate}`);
                setBillingInfo({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    country: '',
                    city: '',
                    postalCode: '',
                });
    
                // Handle success (e.g., redirect to confirmation page)
            })
            .catch((error) => {
                console.error('There was an error submitting the order:', error);
                swal("Error!", "There was an error submitting the order. Please try again.", "error");
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:1000/get_product/${param.id}`)
            .then((res) => {
                setProduct(res.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [param.id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center mt-5 mb-4">
                    <h1>Checkout Page</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <div className="card buy_card">
                        <div className="card-body">
                            <ol className="activity-checkout mb-0 px-4 mt-3">
                                <li className="checkout-item">
                                    <div className="avatar checkout-icon p-1">
                                        <div className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bxs-receipt text-white font-size-20"></i>
                                        </div>
                                    </div>
                                    <div className="feed-item-list">
                                        <div>
                                            <h5 className="font-size-16 mb-1">Billing Info</h5>
                                            <p className="text-muted text-truncate mb-4">Sed ut perspiciatis unde omnis iste</p>
                                            <div className="mb-3">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="name">Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="name"
                                                                    value={billingInfo.name}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="mb3">
                                                                <label className="form-label" htmlFor="email">Email Address</label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    value={billingInfo.email}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="phone">Phone</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="phone"
                                                                    value={billingInfo.phone}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Phone no."
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="address">Address</label>
                                                        <textarea
                                                            className="form-control"
                                                            id="address"
                                                            rows="3"
                                                            value={billingInfo.address}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter full address"
                                                        ></textarea>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <div className="mb-4 mb-lg-0">
                                                                <label className="form-label" htmlFor="country">Country</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="country"
                                                                    value={billingInfo.country}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Your Country"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <div className="mb-4 mb-lg-0">
                                                                <label className="form-label" htmlFor="city">City</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="city"
                                                                    value={billingInfo.city}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Your City"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <div className="mb-0">
                                                                <label className="form-label" htmlFor="postalCode">Zip / Postal code</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="postalCode"
                                                                    value={billingInfo.postalCode}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Postal code"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="checkout-item">
                                    <div className="avatar checkout-icon p-1">
                                        <div className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bxs-truck text-white font-size-20"></i>
                                        </div>
                                    </div>
                                    <div className="feed-item-list">
                                        <div>
                                            <h5 className="font-size-16 mb-1">Shipping Info</h5>
                                            <p className="text-muted text-truncate mb-4">Sed ut perspiciatis unde omnis iste</p>
                                            {/* Add shipping info form here */}
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col">
                            <a href="ecommerce-products.html" className="btn btn-link text-muted">
                                <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping
                            </a>
                        </div>
                        <div className="col">
                            <div className="text-end mt-2 mt-sm-0">
                                <button onClick={handleSubmit} className="btn btn-success">
                                    <i className="mdi mdi-cart-outline me-1"></i> Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 p-0">
                    <div className="card checkout-order-summary">
                        <div className="card-body">
                            <div className="p-3 bg-light mb-3">
                                <h5 className="font-size-16 mb-0">Order Summary <span className="float-end ms-2">#BD0001</span></h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-centered mb-0 table-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="border-top-0" scope="col">Product</th>
                                            <th className="border-top-0" scope="col">Product Desc</th>
                                            <th className="border-top-0" scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row"><img src={`http://localhost:1000/uploads/product/${products && products.product_image1}`} alt="product-img" title="product-img" className="avatar-lg rounded" /></th>
                                            <td>
                                                <h5 className="font-size-16 text-truncate"><a href="#" className="text-dark">{products && products.product_information.slice(0, 20)}...</a></h5>
                                                <p className="text-muted mb-0 mt-1">&#8377;{products && products.product_price} * 1</p>
                                            </td>
                                            <td>&#8377;{products && products.product_price}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h5 className="font-size-14 m-0">Sub Total :</h5>
                                            </td>
                                            <td>
                                                &#8377;{products && products.product_price}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h5 className="font-size-14 m-0">Discount :</h5>
                                            </td>
                                            <td>
                                                &#8377; 0
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan="2">
                                                <h5 className="font-size-14 m-0">Shipping Charge :</h5>
                                            </td>
                                            <td>
                                                &#8377; 0
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <h5 className="font-size-14 m-0">Estimated Tax :</h5>
                                            </td>
                                            <td>
                                                &#8377; 0
                                            </td>
                                        </tr>

                                        <tr className="bg-light">
                                            <td colSpan="2">
                                                <h5 className="font-size-14 m-0">Total:</h5>
                                            </td>
                                            <td>
                                                &#8377;{products && products.product_price}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy_product;
