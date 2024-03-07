//import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "./js/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/Home" element={<Home />}/>
      <Route path="/" element={<Login />}/>
    </Routes>
    </>
  )
  }



export default App;

/*const apiCall=() => {
  axios.get('http://localhost:8000',{mode:"cors"}).then((data)=> {

    console.log(data);
  })*/