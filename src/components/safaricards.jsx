import React, { useState } from "react";
import antelope from "../assets/antelope.jpg";
import cheetah from "../assets/cheetah.jpg";
import giraffe from "../assets/giraffe.jpg";
import lion from "../assets/lion.jpg";
import zebra from "../assets/zebra.jpg";
import giraffe2 from "../assets/giraffe2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";


const SafariCard = () => {
  const [safaris] = useState([
    {
      id: 1,
      title: "7-Day Nothern & Southern Kenya Savanna private safari",
      duration: "7 Days",
      price: "$1000",
      image: antelope,
      description: "Travel is the movement of people between relatively distant geographical...",
      people: "1-10 People",
      location: "Samburu"
    },
    {
      id: 2,
      title: "4-Day Mombasa or Diani – Tsavo East – Amboseli – Nairobi",
      duration: "4 Days",
      price: "$1500",
      image: cheetah,
      description: "Witness the fastest land animal in action.",
      people: "1-6 People",
      location: "Mombasa"
    },
    {
      id: 3,
      title: "4 Days Amboseli Flying Safari",
      duration: "4 Days",
      price: "$1200",
      image: giraffe,
      description: "Get up close and personal with the tallest animals on earth.",
      people: "3-10 People",
      location: "Amboseli"
    },
    {
      id: 4,
      title: "5 Days Tsavo West, Amboseli, Tsavo East National park game safari",
      duration: "5 Days",
      price: "$2000",
      image: lion,
      description: "Experience the king of the jungle in its domain.",
      people: "1-10 People",
      location: "Amboseli"
    },
    {
      id: 5,
      title: "7 Days, Mt Kilimanjaro – Rongai Route",
      duration: "7 Days",
      price: "$900",
      image: zebra,
      description: "Discover the striking patterns of zebras in the wild.",
      people: "1-10 People",
      location: "Tanzania"
    },
    {
      id: 6,
      title: "4 Days Lake Nakuru & Naivasha",
      duration: "4 Days",
      price: "$1200",
      image: giraffe2,
      description: "Another beautiful giraffe safari experience.",
      people: "1-10 People",
      location: "Lake Nakuru"
      
    }
  ]);

  return (
    <div className="row justify-content-around safari-container">
      <div className="safari-content col-md-12">
        <h5>Popular</h5>
        <h2>Explore popular Safaris</h2>
        <h3>Get started with handpicked top rated trips</h3>
      </div>
      {safaris.map((safari, index) => (
        
          <div className="card col-md-3 safari-card">
            <img src={safari.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{safari.title}</h5>
              <p>{safari.price}</p>
              <p className="card-text">{safari.description}</p>
              <p className="card-text"><FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/> {safari.location}</p>
              <p className="card-text"><FontAwesomeIcon icon={faClock} className="icon"/> {safari.duration}</p>
              <p className="card-text"><FontAwesomeIcon icon={faUsers} className="icon"/> {safari.people}</p>
              
              <a href="#" className="btn btn-outline-secondary">See More</a>
            </div>
          </div>
         
      ))}

      <div>
        <button className="btn btn-outline-success view-more">View All Safaris</button>
      </div>
    </div>
  );
};

export default SafariCard;
