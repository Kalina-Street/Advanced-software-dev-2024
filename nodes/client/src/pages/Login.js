import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "../App";
export default function Login() {
  async function loginUser(credentials) {
    //axios.post('http://localhost:8000/login',JSON.stringify(credentials)) 
    axios.get('http://localhost:8000/login',{mode:"cors"}).then((data)=> {
    if (data.data!="authed") {
      return false;
    }
    else {
    localStorage.clear();
    localStorage.setItem('user-token', data.data);
    return true;
    }
    })
  }
  const navi=useNavigate();
  var admin=false
    function portalswitch(e) {
      document.querySelector("#ab").style.backgroundColor="grey"
      document.querySelector("#sb").style.backgroundColor="grey"
      e.preventDefault();
      e.target.style.backgroundColor="purple";
      if (e.target.innerText==="Administrator") {
        admin=true;
      }
      else {
        admin=false;
      }
      console.log(admin)
    }
    function login(e) {
      e.preventDefault();
      const ib=document.querySelector("#ID");
      const ub=document.querySelector("#NAME")
      const pb=document.querySelector("#PASSWORD")
      if (ib.value=='') {
        ib.style.borderColor="red";
      }
      else if (ub.value=='') {
        ib.style.borderColor="black";
        ub.style.borderColor="red";
      }
      else if (pb.value=='') {
        ub.style.borderColor="black";
        pb.style.borderColor="red";
      }
      else {
        pb.style.borderColor="black";
        var hash=0
        for (var i=0;i<pb.value.length ;i++) {
          var atbl=pb.value.charCodeAt(i)
          hash +=atbl*(Math.floor(atbl/5)) *(i+1)
        }
  
        console.log("login attempt: " +ib.value +","+ub.value+","+hash)
        if (loginUser([ib.value,ub.value,hash,admin])) {
          if (localStorage.getItem("user-token")!="authed") {
            localStorage.setItem('user-token', "authed");
            document.querySelector("#log").innerText="loading"
          }
        navi("/Shome")
      }

    }
    }
      return (
        <div>
          <button id="ab" onClick={portalswitch}>Administrator</button>
          <button id="sb" onClick={portalswitch}>Staff</button>
          <p>Organisation ID</p>
          <input id="ID"></input>
          <p>Username</p>
          <input id="NAME"></input>
          <p>Password</p>
          <input id="PASSWORD"></input>
          <button id="log" onClick={login}>Login</button>
        </div>
      );
}