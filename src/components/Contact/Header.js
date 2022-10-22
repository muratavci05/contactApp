import React from "react";
import { Link } from "react-router-dom";


const Header = (props) => {
    return(
        
        <nav className=" container bg-light headerComponent">
            <div className="container">
            <Link to={"/"} className="btn btn-outline-info" >Home</Link>
                        {/* <a className="navbar-brand">My Contact List</a> */}
                
                       {/*  <Search/> 
                        
                         <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>*/}
            </div>
        </nav>
     
    );
};

export default Header;