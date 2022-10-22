import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";

const EditContact = (props) => {

const {contactsState} = useSelector((state) => state);
console.log("contactsState",contactsState);

const dispatch = useDispatch ();


const navigate = useNavigate ();
const params = useParams ();
    const[contacts,setContacts]=useState(null);  
    const[fname,setFname]=useState("");
    const[lname,setLname]=useState("");
    const[pnumber,setPnumber]=useState("");
    const[email,setEmail]=useState("");
    console.log("edit_contact", contacts);

    useEffect (()=>{ 
       axios   
            .get(`http://localhost:3004/databaseContact/${params.contactId}`)
            .then((res) => {
                setContacts("params", res.data);
                setFname(res.data.firsName);
                setLname(res.data.lastName);
                setPnumber(res.data.phone);
                setEmail(res.data.email);
                
            })
            .catch((err) => {
                console.log("editContact", err);
            });
    
    
    }, []);

    const handleSubmit = (event)=>{
        event.preventDefault()
        if( fname === "" || lname === "" || pnumber === "" || email === "" ){
            alert("Please! Fill in the Required Information Completely");
            return;
        }
    
    const contentUpdate ={
        id: params.contactId,
        firsName: fname[0].toUpperCase()+fname.substring(1),
        lastName: lname[0].toUpperCase()+lname.substring(1),
        phone: pnumber,
        email: email,

    };
    console.log(contentUpdate);
        axios
            .put(`http://localhost:3004/databaseContact/${params.contactId}`,contentUpdate)
            .then((res)=>{
                console.log("updatecontent", res);
                dispatch({ type: "EDIT_CONTACTS", payload: contentUpdate});
                navigate("/searchList")
            })
            .catch((err)=>console.log(err));

    };

    if (contactsState === null) {
        return <Loading/>;
    }



    return ( 
    <div className="contactContainer">
       <form onSubmit={handleSubmit}
        className="container formContainer">
          <div className="titleName"><h1>ContactApp</h1></div>
            <div className="input-group firsName">
                <input 
                type="text" 
                className="form-control"
                placeholder="Firs Name"
                value={fname}
                onChange={(event) => setFname(event.target.value)}
                />
            
                <input 
                type="text" 
                className="form-control" 
                placeholder="Last Name"
                value={lname}
                onChange={(event) => setLname(event.target.value)}
                />
            </div>
            <div className="input-group email">
                <input 
                type="text" 
                className="form-control" 
                placeholder="e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className=" container mb-3 phoneNum">
                <input 
                type="phoneNumber" 
                className="form-control" 
                id="mobilNumber"
                placeholder="Phone Number..."
                value={pnumber}
                onChange={(event) => setPnumber(event.target.value)}
                
                 
                 />
             </div>
              <button type="submit" 
              className="btn btn-outline-primary m-1" 
              onClick={()=>navigate("/searchList/")}
              >
                CANCEL
                </button>

                <button 
                    type="submit"
                    className="btn btn-outline-success m-1" 
                    >
                    SAVE
                        </button>
        
        </form>
        
</div>
    );
};

export default EditContact;