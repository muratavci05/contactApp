import React, {useEffect,useState} from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import {FaUserEdit} from "react-icons/fa";
import {BiCommentDetail} from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "./Loading";
import Detail from "./detail";

const Search = (props) => {


    const params = useParams ();
    const navigate = useNavigate ();
    const dispatch = useDispatch ();

    const {contactsState} = useSelector((state) => state);
  console.log ("contactsState", contactsState);
  const [filterContent,setFilterContent] = useState(null);

  const [contentUpdate,setContentUpdate] = useState ("")
  const [searchContent,setSearchContent] = useState("");

  const [showModal,setShowModal] = useState(false)
  const [contactInfo, setContactInfo] = useState ({});
  
  

  useEffect (()=>{
            const filtered = contactsState.contacts.filter(
                (item) =>item.firsName.toLowerCase().includes(searchContent) || item.lastName.toLowerCase().includes(searchContent));
                setFilterContent(filtered);
  },[searchContent,contactsState]);


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

  if (contactsState.success !== true || filterContent === null ) {
    return <Loading /> 
  };

 console.log(">>>>> ?????? >>>>", contactInfo);

    return(
        <div className="container">
        
           
           
           
           {/* search >>> */}
           <div className="container navbar inputContainer">
           <input className="form-control mr-sm-2 inputFormControl" 
                        type="search" 
                        placeholder="Search"
                        value={searchContent}
                        style={{color:"blue", fontWeight:"bold"}}
                        onChange= {(event) => setSearchContent(event.target.value)}
                        />
           </div>
                
                
             {/* <<< */}
           
        
        <div> 
          {
            showModal == true && 
              <Detail
              setShowModal={setShowModal}   
              onCancel ={()=> setShowModal(false)}
              contactInfo={contactInfo}
              />        
          }
          
        <table className="table caption-top">
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

                      {filterContent.map((databaseContact) => {
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
                                <BiCommentDetail 
                                className="detailIcon"
                                size="2rem"
                                onClick={() =>{
                                  setShowModal(true);
                                  setContactInfo({
                                    firsName: databaseContact.firsName,
                                    lastName: databaseContact.lastName,
                                    phone: databaseContact.phone,
                                    email: databaseContact.email
                                  });
                                  

                                  
                                }}
                                />

                                 {/*  <Link to={`/detail-modal/${databaseContact.id}`}> <BiCommentDetail/></Link> */}
                                                                 
                                
                              </td>             
                              
                              
                            </tr>                     


                          );
                        })
                      }
                      
                      
                    </tbody>
                    
              </table>
              
            

              
        </div>

        </div>
    );
};

export default Search;