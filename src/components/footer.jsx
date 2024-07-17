import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";


const Footer = () =>{
    return(
        <>
        <div className="background-image-container">
            <div className="footer">
                <div className="contact-info row">
                    <h5>Contact Info</h5>
                    <p>Open from 8 AM to 9 PM everyday</p>
                    <p><FontAwesomeIcon icon={faPhone}/> +254748153767</p>
                    <p><FontAwesomeIcon icon={faEnvelope}/> malikale@gmail.com</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Nairobi, Kenya</p>
                </div>
                <div className="destinations row">
                    <h5>Destinations</h5>
                    <p>Maasai Mara</p>
                    <p>Amboseli</p>
                    <p>Samburu</p>
                    <p>Lake Nakuru</p>
                    <p>Lake Turkana</p>
                </div>
                <div className="activities row">
                    <h5>Activities</h5>
                    <p>City Tour</p>
                    <p>Trekking</p>
                    <p>Jungle Safari</p>
                    <p>Cycling</p>
                    <p>Hiking</p>
                    <p>Boating</p>
                </div>
                <div className="trip-types row">
                    <h5>Trip Types</h5>
                    <p>Nature Friendly</p>
                    <p>Budget Travel</p>
                    <p>Cultural</p>
                    <p>Child friendly</p>
                    <p>High Altitude</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer