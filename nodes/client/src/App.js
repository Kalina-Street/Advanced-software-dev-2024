//import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./js/protectedroute";

import SHome from "./pages/SHome";
import Login from "./pages/Login";
import Ahome from "./pages/Ahome";


function App() {
    /*axios.get('http://localhost:8000/loginc',{mode:"cors"}).then((data)=> {
  
      console.log(data);
    })*/
  return (
    <>
    <Routes>
      <Route path="/SHome" element={ <ProtectedRoute>
        <SHome />
        </ProtectedRoute>}
        />
      <Route path="/" element={<ProtectedRoute>
        <Login />
        </ProtectedRoute>}/>

        <Route path="/Ahome" element={<ProtectedRoute>
        <Ahome />
        </ProtectedRoute>}/>
    </Routes>

    
    </>
  )
  }



export default App;

