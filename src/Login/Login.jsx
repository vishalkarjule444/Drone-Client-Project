import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './login.css'; 

function Login() {
  useEffect(() => {
    AOS.init({ duration: 1200 }); 
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: '#E6E6FA' }}>
    <div className='container'>
        <div className='row'>
        <h1 className="head mb-1 mt-5 col-md-12"  data-aos="zoom-in-ridht" data-aos-delay="400" >Login Here</h1>
            <div className='col-md-6 p-5'>
            <div className="login-form" >
                 <form action="/login" method="post" className='form-control w-100' data-aos="zoom-in-up" data-aos-delay="400">
                    <h3 className="text-center mb-5">Log In</h3>       
                       <div className="form-group">
                         <input type="email" className="form-control" placeholder="Email" required="required"/>
                       </div>
                       <div className="form-group">
                          <input type="password" className="form-control" placeholder="Password" required="required"/>
                        </div>
                        <div className="form-group">
                           <button type="submit" className="btn btn-primary btn-block w-100">Log in</button>
                        </div>    
                    </form>
                     {/* registration page link */}
                  <p className="text-center"><a href='#'>Create an Account</a></p>
                </div>
            </div>
            <div className='col-md-6' data-aos="zoom-in-down" data-aos-delay="400">
              <img src='back1.jpg' alt=''className='l-img w-100'/>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;


