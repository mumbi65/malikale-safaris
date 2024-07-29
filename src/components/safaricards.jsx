import React, { useState } from "react";
import antelope from "../assets/antelope.jpg";
import cheetah from "../assets/cheetah.jpg";
import giraffe from "../assets/giraffe.jpg";
import lion from "../assets/lion.jpg";
import zebra from "../assets/zebra.jpg";
import giraffe2 from "../assets/giraffe2.jpg";
import samburu from "../assets/samburu2.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSafari } from "./safaricontext";


const SafariCard = () => {
  const {safaris} = useSafari()

  return (
    <div className="row justify-content-around safari-container">
      <div className="safari-content col-md-12">
        <h5>Popular</h5>
        <h2>Explore popular Safaris</h2>
        <h3>Get started with handpicked top rated trips</h3>
      </div>
      {safaris.map((safari) => (
        
          <div className="card col-md-3 safari-card" style={{width: "30%"}} key={safari.id}>
            <img src={safari.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{safari.title}</h5>
              <p>{safari.price}</p>
              <p className="card-text">{safari.description}</p>
              <p className="card-text"><FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/> {safari.location}</p>
              <p className="card-text"><FontAwesomeIcon icon={faClock} className="icon"/> {safari.duration}</p>
              <p className="card-text"><FontAwesomeIcon icon={faUsers} className="icon"/> {safari.people}</p>
              
              <Link to={`/safari/${safari.id}`} className="btn btn-outline-success">See More</Link>
            </div>
          </div>
         
      ))}
      <div>
        <Link to="/safaripackages" className="btn btn-outline-success view-more">View All Safaris</Link>
      </div>
    </div>
  );
};

export default SafariCard;


// Redux - state management
// Creating your own hooks
// Chartjs - creating charts
// Material UI
// Tailwind CSS
// Bootstrap