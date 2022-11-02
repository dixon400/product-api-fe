import React, { Fragment, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from '../auth';

const Navbar = () => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink to="/" className="nav-link">
                Home
                <span className="sr-only">(current)</span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {isAuthenticated() &&
                        (
                            <Fragment>
                                <li className="nav-item">
                                    <NavLink to="products" className="nav-link">
                                        Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="addproduct" className="nav-link">
                                        Add product
                                    </NavLink>
                                </li>


                                <li className="nav-item">
                                    <NavLink to="categories" className="nav-link">
                                        Categories
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="rentalLog" className="nav-link">
                                        Rental Log
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link"
                                        style={{ cursor: 'pointer', color: '#ffffff' }}
                                        onClick={() =>
                                            signout(()=>navigate("/"))}>
                                        Signout
                                    </span>
                                </li>
                            </Fragment>
                        )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar