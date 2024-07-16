import React from "react";

const NavBar = () =>{
    return(
        <>
        <div className="nav-bar">
            <h1>Mali Kale <span>Safaris</span></h1>
            <div className="nav-links">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item navbar-link">
                                        <a class="nav-link" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li class="nav-item navbar-link">
                                        <a class="nav-link" href="#">About us</a>
                                    </li>
                                    <li class="nav-item dropdown navbar-link">
                                        <a class="nav-link  " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Safaris
                                            {/* dropdown-toggle */}
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li><hr class="dropdown-divider"/></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item navbar-link">
                                        <a class="nav-link navbar-link" href="#">Gallery</a>
                                    </li>
                                    <li class="nav-item navbar-link">
                                        <a class="nav-link" href="#">Contact Us</a>
                                    </li>
                                </ul>
                                {/* <div>
                                    <form class="d-flex" role="search">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                            <button class="btn btn-outline-success" type="submit">Search</button>
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