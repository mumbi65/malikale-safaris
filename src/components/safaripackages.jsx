import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { useSafari } from "./safaricontext";


const SafariPackage = () => {
  const { mapData } = useSafari()

  return (
    <>
    <NavBar/>
    <div className="row justify-content-around safari-package-container">
      {mapData.map((safari) => (
        
          <div className="card col-md-3 safari-package-card" key={safari.id}>
            <img src={safari.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{safari.title}</h5>
              <p>{safari.price}</p>
              <p className="card-text">{safari.description}</p>
              <p className="card-text"><FontAwesomeIcon icon={faMapMarkerAlt} className="safari-package-icon"/> {safari.location}</p>
              <p className="card-text"><FontAwesomeIcon icon={faClock} className="safari-package-icon"/> {safari.duration}</p>
              <p className="card-text"><FontAwesomeIcon icon={faUsers} className="safari-package-icon"/> {safari.people}</p>
              <Link to={`/safari/${safari.id}`}  className="btn btn-outline-success">See More</Link>
            </div>
          </div>
         
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default SafariPackage;
