import React from "react";
import NavBar from "./navbar";
import safari from "../assets/safari.jpg"
import Footer from "./footer";
import safari2 from "../assets/safari2.jpg"

const AboutUs = () =>{
    return(
        <>
        <NavBar/>
        <div className="heading">
            <h1>About Us</h1>
        </div>
        <div className="aboutus-content">
            <div className="content-paragraph">
                <h5>About MaliKale Kenya Safaris</h5>
                <p>Mali Kale Kenya Safari’s Ltd, Was established and registered in Kenya by Patrick who was working in the tourism industry where he got enough experience after working with different company in Kenya hence he decided to establish Mali Kale in 2010.</p> <br />

                <p>Now I decide to share my experience with everybody and explore Kenya, and also to encourage a new way of Travel into the remote of Northern and southern circuit in Kenya.</p> <br />
                
                <p>Kenya is one of the least known countries in the world, as well as one of the least explored. It is a country open to the imagination, with so much to discover: – National parks, open savanna, volcanic mountains, salt flats, 1000 years of forests, lakes, rivers and ocean. At the same time, Kenya offers a journey through the history of human evolution as the cultures that originated their thousands of years ago and maintained their customs to this day.</p>
            </div>
            <div className="content-image">
                <img src={safari2} alt="" />
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default AboutUs