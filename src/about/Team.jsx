import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import './team.css';
import axios from "axios";

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 1200 });

    const fetchTeamMembers = async () => {
      try {
        const res = await axios.get('http://localhost:1000/get_about_team_member');
        setTeams(res.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
      <div className="container" data-aos="fade-up">
        <div className="row ">
          <h1 className="t-head mt-2">Meet the Team</h1>
          <h2 className="mb-5 text-center mt-3">Simply stated, it is less me and more we.</h2>
            {teams && teams.map((item, index) => (
              <div className="col-lg-4 mb-5" key={index}>
                <div className="titlecardss text-center" data-aos="flip-down" data-aos-duration="1200" data-aos-delay="400">
                  <div className="card-body p-4">
                    <div className="member-img-container">
                      <img
                        src={`http://localhost:1000/uploads/admin/${item?.member_image}`}
                        alt={item?.member_name} className="t-img" style={{height:'80px',width:'100px'}}
                      />
                    </div>
                    <h5 className="card-text t-text mt-4">{item?.member_name}</h5>
                    <h6 className="mt-3 p-0">{item?.member_profession}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
  );
}

export default Team;
