import React, { useEffect, useState } from 'react';
import './blog.css';
import axios from 'axios';

function Blog() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1000/get_home_blog')
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs.</p>;

  return (
    <div>
      <section className="home mt-5 mb-5">
        <div id="carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-controls">
            <ol className="carousel-indicators">
              {blog.map((item, index) => (
                <li
                  key={index}
                  data-target="#carousel"
                  data-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  style={{ backgroundImage: `url(http://localhost:1000/uploads/admin/${item.client_image?? "Loading..."})` }}
                ></li>
              ))}
            </ol>
            <a className="carousel-control-prev border shadow" href="#carousel" role="button" data-slide="prev">
              <img src="prev.png" alt="Previous" />
            </a>
            <a className="carousel-control-next border shadow" href="#carousel" role="button" data-slide="next">
              <img src="next.png" alt="Next" />
            </a>
          </div>
          <div className="carousel-inner">
            {blog.map((item, index) => (
              <div key={index} className={`pt-5 carousel-item text-center ${index === 0 ? 'active' : ''}`}>
                <p className='text-center font-weight-bold' style={{ color: '#077d3f' }}>What's Happen Here</p>
                <h2 className='mt-3 mb-3'>What Client Says</h2>
                <div className="container">
                  <img src={`http://localhost:1000/uploads/admin/${item.client_image?? "Loading..."}`} width={100} alt={item.author} />
                  <h6>{item.client_name}</h6>
                  <h5>{item.client_profession}</h5>
                  <h6 className='p-5'>{item.what_client_says}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
