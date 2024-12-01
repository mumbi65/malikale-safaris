import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSafari } from "./safaricontext";
import axios from "axios";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyncLoader } from 'react-spinners';


const NavBar = () =>{

    const { mapData } = useSafari()
    const [safaris, setSafaris] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSafaris = async () => {
            try {
                const response = await axios.get("https://malikale-safaris.onrender.com/safari/api/safaris/")
                setSafaris(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching safaris", error)
                setLoading(false)
            }
        }
        fetchSafaris()
    }, [])

    const safarisWithMaps = safaris.map((safari) => {
        const map = mapData.find((m) => m.title === safari.location);
        return { ...safari, mapEmbedUrl: map?.mapEmbedUrl };
    });


    return(
        <>
        <div className="nav-bar">
            <h1>MaliKale <span>Safaris</span></h1>
            <div className="nav-links">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item navbar-link">
                                        <Link to="/home" className="nav-link" aria-current="page">Home</Link>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <Link to="/aboutus" className="nav-link" >About Us</Link>
                                    </li>
                                    <li className="nav-item dropdown navbar-link">
                                        <a className="nav-link"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Safaris
                                            {/* dropdown-toggle */}
                                        </a>
                                        <ul className="dropdown-menu">
                                            { loading ? (
                                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh'}}>
                                                <SyncLoader color='#029132' size={10} />
                                              </div>
                                            ): (
                                                safarisWithMaps.map((safari) =>(
                                                <li key={safari.id}>
                                                    <Link to={`/safari/${safari.id}`} className="dropdown-item" >{safari.title}</Link>
                                                </li>
                                            ))
                                            )}
                                        </ul>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <Link to="/gallery" className="nav-link navbar-link">Gallery</Link>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <Link  to="/contactus" className="nav-link" >Contact Us</Link>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <Link  to="/profile" className="nav-link" ><FontAwesomeIcon icon={faUser}/></Link>
                                    </li>
                                </ul>
                                {/* <div>
                                    <form className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                    </nav>
            </div>
        </div>
        </>
    )
}

export default NavBar