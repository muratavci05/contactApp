
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



const Detail = (props) => {

    const { contactsState } = useSelector((state) => state);
    console.log("contactsState", contactsState);


    const { onCancel, onConfirm, contactInfo } = props
    /*     const [modalState,setModalState] = useState(false)
     */



    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const params = useParams();
    console.log(">>> params", params);

    

    useEffect(() => {

        /* axios
            .get(`http://localhost:3004/databaseContact/${params.contactId}`)
            .then((res) => {
                console.log("detailres", res.data);
                setFname(res.data.firsName);
                setLname(res.data.lastName);
                setPhone(res.data.phone);
                setEmail(res.data.email);




            })
            .catch((err) => console.log("detailerror", err));
 */

    }, []);
    console.log("contactInfo >>>>", contactInfo)


    return (
        <div className="container modalComponentContainer">

            <div classNameName="modal-dialog modal-dialog-scrollable"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">


                <div classNameName="modal-dialog">
                    <div classNameName="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 titleCard" id="staticBackdropLabel">Contact Details Card</h1>
                            <button
                                type="button"
                                className="btn-close btnIconDetail"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onCancel}
                            ></button>
                        </div>
                        {/*  Modal Form */}
                        <div className="modal-body inputModalx">
                            <div className="input-group">
                                <span className="input-group-text">First Name</span>
                                <input
                                    value={contactInfo?.firsName}
                                    onChange={(event) => setFname(event.target.value)}
                                    type="text"
                                    aria-label="First name"
                                    className="form-control formModal" disabled
                                />

                            </div>
                            <div className="input-group">

                                <span className="input-group-text">Last Name</span>
                                <input
                                    value={contactInfo?.lastName}
                                    onChange={(event) => setLname(event.target.value)}
                                    type="text"
                                    aria-label="Last name"
                                    className="form-control formModal" disabled
                                />
                            </div>
                            <div className="container modal-body inputModaly">
                                <div className="input-group ">
                                    <span className="input-group-text">Phone Number</span>
                                    <input
                                        value={contactInfo?.phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        type="text"
                                        aria-label="First name"
                                        className="form-control formModal" disabled
                                    />
                                </div>
                                <div className="input-group ">
                                    <span className="input-group-text">e-mail Adress</span>
                                    <input
                                        value={contactInfo?.email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        type="text"
                                        className="form-control disapled formModal" disabled
                                    />
                                </div>
                            </div>



                        </div>
                        <div className="container modal-footer modalButtons">
                            <div className="detailContainer">
                                <div className="closeB">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary closeB"
                                        data-bs-dismiss="modal"
                                        onClick={onCancel}
                                    >Close</button>

                                </div>
                                <div className="homeB">
                                    <button
                                        onClick={onConfirm}
                                        type="button" className="btn btn-outline-secondary homeB">Home</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
};

export default Detail;