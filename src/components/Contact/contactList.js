import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { AiFillDelete } from "react-icons/ai";
import {FaUserEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../CSS/styles.css";





const ListContact = (props) => {

  const dispatch = useDispatch();

  const {contactsState} = useSelector((state) => state);
  console.log ("contactsState", contactsState);
  

/*   const [contents,setContents] = useState(null); */  const [contentUpdate,setContentUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{

    



        /* axios
            .get("http://localhost:3004/databaseContact")
            .then ((res)=>{
              console.log("res", res);
              setContents(res.data);
            })
            .catch ((err) => {console.log ("err", err);
            })
         */
  },[contentUpdate]);

  const deleteContent = (id)=>{
    console.log("DeleteContent", id);

    axios
        .delete(`http://localhost:3004/databaseContact/${id}`)
        .then((res)=>{
          console.log("DeleteContent", res);
          dispatch({type: "DELETE_CONTACTS", payload:id})
          setContentUpdate(!contentUpdate);
        })
        .catch((err)=>{
          console.log("DeleteContent Error", err);
        })
  }

  if (contactsState.success !== true ) {
    return <Loading /> 
  };
  

    return (
        <div className="container p-1 contackListStyle">

                  {/* Search component start*/}
                    <div className="container navbar bg-light headerStyle" >
                        <div className="container-fluid">
                            <Link to={"/"} className="btn btn-outline-info" >Home</Link>
                                    
                        </div>
                        
                     </div>
                     {/* Search component end  */}

           
          {/* Table component >>> my listin  */}

               <table className="table caption-top table-hover tableContainer">
                        <thead>
                          <tr className="col text-white bg-primary">
                            <th scope="col">Firs Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">e-mail</th>
                            <th scope="col"></th>
                            
                          </tr>
                        </thead>
                    <tbody>
                      {/* For Döngüsü ile (map kullanarak) json  daki  veriyi ekrana döküyoruz */}

                      {contactsState.contacts.map((databaseContact) => {
                          return(
                            <tr>
                              <td>{databaseContact.firsName}</td>
                              <td>{databaseContact.lastName}</td>
                              <td>{databaseContact.phone}</td>
                              <td>{databaseContact.email}</td>
                              <td>
                                                      
                                 
                               
                                 
                                 <AiFillDelete
                                 className="deleteIcon" 
                                 size="1.5rem" 
                                 onClick={()=>deleteContent(databaseContact.id)}
                                 /> 
                                 <FaUserEdit 
                                 className="editIcon" 
                                 size="1.5rem" 
                                 onClick={() =>navigate(`/edit-contact/${databaseContact.id}`)}  //window.location.replace >> yerine "navigate" kullanıldı

                                    />
                                
                              </td>             
                              
                            </tr>                     


                          );
                        })
                      }
                      
                      
                    </tbody>
                    
                    
              </table>
                  
        </div>

    );
};

export default ListContact;