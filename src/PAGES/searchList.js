import React from "react";
import Search from "../components/Contact/Search";
import Header from "../components/Contact/Header";

const SearchList = (props) =>{
    return(
        <div className="container">
            <div className="container ">
            <nav className="container navbar navbar-expand-lg navbar-light bg-light">
                
                <Header />
            </nav>
            <div>
            <Search />
            
            </div>          
            </div>
            
        </div>
    )
}

export default SearchList;