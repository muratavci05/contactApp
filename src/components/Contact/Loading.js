import React from "react";

const Loading = (props) => {

    return(
     <div 
        style=                  
            {{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
        <button 
            className="btn btn-primary" 
            type="button" 
            disabled>
                    <span 
                    className="spinner-grow spinner-grow-sm" 
                    role="status" 
                    aria-hidden="true"
                    >
                    </span>
                         Loading...
        </button>
     </div>   
        
    );
};

export default Loading;