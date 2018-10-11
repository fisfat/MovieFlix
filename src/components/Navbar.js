import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="grey darken-4">
            <div className="container nav-wraper">
                <a href="/" className="brand-logo">VeegofliX</a>
                <ul id="" className="right">
                    <li > <NavLink to="/">Home</NavLink> </li>
                    
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;