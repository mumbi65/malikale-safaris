import React, { useState } from "react";
import antelope from "../assets/antelope.jpg";
import cheetah from "../assets/cheetah.jpg";
import giraffe from "../assets/giraffe.jpg";
import lion from "../assets/lion.jpg";
import zebra from "../assets/zebra.jpg";
import giraffe2 from "../assets/giraffe2.jpg";


const SafariCard = () => {
  const [safaris] = useState([
    {
      id: 1,
      title: "Antelope Safari",
      duration: "3 Days",
      price: "$1000",
      image: antelope,
      description: "Explore the beautiful antelopes in their natural habitat."
    },
    {
      id: 2,
      title: "Cheetah Safari",
      duration: "4 Days",
      price: "$1500",
      image: cheetah,
      description: "Witness the fastest land animal in action."
    },
    {
      id: 3,
      title: "Giraffe Safari",
      duration: "5 Days",
      price: "$1200",
      image: giraffe,
      description: "Get up close and personal with the tallest animals on earth."
    },
    {
      id: 4,
      title: "Lion Safari",
      duration: "6 Days",
      price: "$2000",
      image: lion,
      description: "Experience the king of the jungle in its domain."
    },
    {
      id: 5,
      title: "Zebra Safari",
      duration: "3 Days",
      price: "$900",
      image: zebra,
      description: "Discover the striking patterns of zebras in the wild."
    },
    {
      id: 6,
      title: "Giraffe Safari",
      duration: "5 Days",
      price: "$1200",
      image: giraffe2,
      description: "Another beautiful giraffe safari experience."
    }
  ]);

  return (
    <div className="row align-items safari-container">
      <div className="safari-content">
        <h5>Popular</h5>
        <h2>Explore popular Safaris</h2>
        <h3>Get started with handpicked top rated trips</h3>
      </div>
      {safaris.map((safari, index) => (
        <div key={index} className="col-md-3 safari-card">
          <div className="card">
            <img src={safari.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{safari.title}</h5>
              <p>{safari.price}</p>
              <p className="card-text">{safari.description}</p>
              <a href="#" className="btn btn-outline-secondary">See More</a>
            </div>
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
