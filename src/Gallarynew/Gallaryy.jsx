import React, { useEffect, useState } from "react";
import './Gallary.css';
import axios from "axios";

function Gallary2() {
  const [galleryHeader, setGalleryHeader] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);

  useEffect(() => {
    fetchGalleryHeader();
    fetchGalleryImages();
  }, []);

  const fetchGalleryHeader = async () => {
    const res = await axios.get('http://localhost:1000/gallery_header_api');
    setGalleryHeader(res.data);
  };

  const fetchGalleryImages = async () => {
    const res = await axios.get('http://localhost:1000/gallery_image_api');
    setGalleryImage(res.data);
  };

  return (
    <div style={{ backgroundColor: 'lavender', margin: 0, padding: 0 }}>
      <section className="contact">
        <div className="container-fluid">
          <div className="row">
            {galleryHeader.map((item) => (
              <div className="col-md-12 container_head" key={item.id}>
                <img src={`http://localhost:1000/uploads/admin/gallery/header/${item.header_image}`} alt="" className="w-100 h-100" />
                <div className="row">
                  <div className="col-md-12 text-center container_info p-5">
                    <h1 className="hidden ml-5" data-aos="slide-right">{item.header_title}</h1>
                    <p className="fs-6 ml-5" data-aos="slide-right">Home / <span>Contact</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="card-body w-auto">
                {galleryHeader.map((item) => (
                  <h1 key={item.id}><u>{item.header_title}</u></h1>
                ))}
                <br />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {galleryImage.map((item) => (
              <div className="col-md-4 mb-5" key={item.id}>
                <div className="bg-white">
                  <div className="card-body">
                    <img src={`http://localhost:1000/uploads/admin/gallery/images/${item.gallery_image}`} className="w-100" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Gallary2;
