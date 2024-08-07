import React from "react";
import antelope from "../assets/antelope.jpg"
import cheetah from "../assets/cheetah.jpg"
import giraffe from "../assets/giraffe.jpg"
import lion from "../assets/lion.jpg"
import safari from "../assets/safari.jpg"
import SafariCard from "./safaricards";
import whiterhino from "../assets/white-rhino.jpg"

const HomePage = () =>{
    return(
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={safari} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Explore the Wild</h5>
                                <p>Embark on an unforgettable safari adventure and witness the majestic wildlife in their natural habitat.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={cheetah} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Witness the Speed</h5>
                                <p>Experience the thrill of seeing a cheetah in action, the fastest land animal on earth.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={whiterhino} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Encounter the Giants</h5>
                                <p>Get up close and personal with the magnificent white rhino, a symbol of strength and resilience.</p>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div>
                <SafariCard/>
            </div>
        </>
    )
}

export default HomePage