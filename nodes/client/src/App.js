//import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./js/protectedroute";

import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
    /*axios.get('http://localhost:8000/loginc',{mode:"cors"}).then((data)=> {
  
      console.log(data);
    })*/
  return (
    <>
    <Routes>
      <Route path="/Home" element={ <ProtectedRoute>
        <Home />
        </ProtectedRoute>}
        />
      <Route path="/" element={<ProtectedRoute>
        <Login />
        </ProtectedRoute>}/>
    </Routes>
    </>
  )
  }



export default App;

