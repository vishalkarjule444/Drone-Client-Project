import React from "react";
import Form from "./Form.jsx";
import Contact_info from "./Contact_info.jsx";

export default function Contact_form(){
        
    return(
        <>
            <section className=" mb-5 mt-5  ">

                <div className="container">
                    <div className="row">
                       
                    </div>
                </div>

                <div className="container  ">
                    <div className="row">
                        <div className="col-md-12 d-md-flex ">
              
                       <Form/>
                       <Contact_info/>
                        </div>
                    </div>
                </div>

               

            </section>
        </>
    )
}