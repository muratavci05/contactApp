import React,{useEffect,useState} from "react";
import "../CSS/styles.css";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../Contact/Loading";
import { useDispatch } from "react-redux";
import {RiContactsBookUploadFill} from "react-icons/ri";


const AddContentForm = (props)=>{

    const dispatch = useDispatch ();


    const [databaseContact,setDatabaseContact]=useState(null);
    const Navigate = useNavigate("");
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [pnumber,setPnumber]=useState("");
    const [email,setEmail]=useState("");

   // veri girmeden önce veri tabanındaki bilgilerin çağırılması işlemi
    useEffect(()=>{
        axios.get("http://localhost:3004/databaseContact")
        .then((res)=>{
            console.log("firs data res", res);
            setDatabaseContact(res.data);
        })

        .catch ((err)=>{
            console.log ("firs data error", err)
        });

    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (fname === "" || lname === "" || pnumber === "" || email === ""){
            alert("Please! Fill in the Required Information Completely");
            return (  

            setFname(""),
            setLname(""),
            setPnumber(""),
            setEmail("")
            
            );
          
        }

        
        const newContact = {
            "id": new Date().getTime(),
            "firsName": fname[0].toUpperCase()+fname.substring(1),
            "lastName": lname[0].toUpperCase()+lname.substring(1),
            "phone": pnumber,
            "email": email,

        };
        //console.log (newContact);

        //axios post ile yeni kişi kaydını veritabanına (json)gönderip kayıt edilmesi yapılan işlem

        axios
            .post("http://localhost:3004/databaseContact",newContact)
            .then((res) => {
                console.log ("neContact res", res);
                dispatch({type: "ADD_CONTACTS", payload: newContact});
                

                //forma veriyi girip kaydet dedikten sonra formun temizlenip boş olması için 
                setFname("");
                setLname("");
                setPnumber("");
                setEmail("");
                Navigate("/");
               
            })
            .catch((err) => {
                console.log ("newContact err", err);
            })

    };


    if (databaseContact === null){
        return <Loading/>
    }


    return(
<div className="contactContainer">
       <form onSubmit={handleSubmit}
        className="container formContainer">
          <div className="titleName"><h1><RiContactsBookUploadFill color="F9BFA2"/> ContactApp </h1></div>
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
            
                <button type="submit" className="btn btn-outline-primary m-1" >ADD</button>
                <Link to={"/searchList"} className="btn btn-outline-success m-1" >Content View</Link>
{/*                 <Link to={"/my-listing"} className="btn btn-outline-success m-1" >Search</Link>
 */}
             
        </form>
        
</div>

    );
};

export default AddContentForm;