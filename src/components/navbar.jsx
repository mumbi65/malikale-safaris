import React from "react";
import { Link } from "react-router-dom";

const NavBar = () =>{
    return(
        <>
        <div className="nav-bar">
            <h1>Mali Kale <span>Safaris</span></h1>
            <div className="nav-links">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item navbar-link">
                                        <Link to="/" className="nav-link" aria-current="page" href="#">Home</Link>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <Link to="/aboutus" className="nav-link" href="#">About us</Link>
                                    </li>
                                    <li className="nav-item dropdown navbar-link">
                                        <a className="nav-link  " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Safaris
                                            {/* dropdown-toggle */}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <a className="nav-link navbar-link" href="#">Gallery</a>
                                    </li>
                                    <li className="nav-item navbar-link">
                                        <a className="nav-link" href="#">Contact Us</a>
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