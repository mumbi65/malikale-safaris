import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import antelope from "../assets/antelope.jpg";
import cheetah from "../assets/cheetah.jpg";
import giraffe from "../assets/giraffe.jpg";
import giraffe2 from "../assets/giraffe2.jpg";
import leopard2 from "../assets/leopard2.jpg";
import lion from "../assets/lion.jpg";
import lion2 from "../assets/lion2.jpg";
import lions from "../assets/lions.jpg";
import rhino from "../assets/rhino.jpg";
import safari from "../assets/safari.jpg";
import safari1 from "../assets/safari1.jpg";
import safari2 from "../assets/safari2.jpg";
import safari3 from "../assets/safari3.jpg";
import safari4 from "../assets/safari4.jpg";
import safari5 from "../assets/safari5.jpg";
import safari6 from "../assets/safari6.jpg";
import tigers from "../assets/tigers.jpg";
import whiterhino from "../assets/white-rhino.jpg";
import zebra from "../assets/zebra.jpg";
import zebra2 from "../assets/zebra2.jpg";

const Gallery = () =>{

    const images = [
       antelope, cheetah, giraffe, giraffe2, leopard2, lion, lion2, lions, rhino, safari, safari1, safari2, safari3, safari4, safari5, safari6, tigers, whiterhino, zebra, zebra2
    ]

    return(
        <>
        <NavBar/>
        <div className="gallery-heading">
            <h1>Gallery</h1>
        </div>
        <div className="gallery-container">
            {
                images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img src={image} alt="" />
                    </div>
                ))
            }
        </div>
        <Footer/>
        </>
    )
}

export default Gallery