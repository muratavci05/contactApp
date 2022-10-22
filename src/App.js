import React,{useEffect} from 'react';
import './App.css';
import MyIndex from './PAGES/index';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MyListing from './PAGES/myListing';
/* import Header from './components/Contact/Header'; */
import EditC from './PAGES/edit';
import Search from './components/Contact/Search';
import {useDispatch} from "react-redux";
import axios from 'axios';
import SearchList from './PAGES/searchList';
import DetailModal from './PAGES/detailModal';





function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CONTACTS_START"});
    axios
        .get("http://localhost:3004/databaseContact")
        .then ((res) => {
          dispatch({ type: "FETCH_CONTACTS_SUCCESS",payload:res.data})
        })
        .catch ((err) => { 
          dispatch({ type: "FETCH_CONTACTS_FAIL",
                     payload: "An Error Occurred While Retrieving Contacts List!",
                    });
         });
  },[]);

  return (
    
  <BrowserRouter>
    <Routes>
{/*       <Route path="/my-listing/:Header" element={<Header/>}/>  */}     
 
      <Route path="/" element={<MyIndex/>}/>
      <Route path="/my-listing" element={<MyListing/>}/>
      <Route path="/search-contacts" element={<Search/>} />   
      <Route path="/searchList" element={<SearchList/>}  />
      <Route path="/edit-contact/:contactId" element={<EditC/>}/>
      <Route path="/detail-modal/:contactId" element={<DetailModal/>} />
  
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
