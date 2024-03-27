import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "../App";
export default function Login() {
  async function loginUser(credentials) {
    await axios.post('http://localhost:8000/login',JSON.stringify(credentials),{mode:"cors"}).then((data)=> {
      console.log(data)
    //await axios.get('http://localhost:8000/login',{mode:"cors"}).then((data)=> {
    if (data.data.id==="") {
      return false;
    }
    else {
    localStorage.setItem('user-token', data.data.id);
    localStorage.setItem('auth-token', "authed");
    navi("/SHome")
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
    async function login(e) {
      e.preventDefault();
      const ib=document.querySelector("#ID");
      const fb=document.querySelector("#FNAME")
      const lb=document.querySelector("#LNAME")
      const pb=document.querySelector("#PASSWORD")
      if (ib.value=='') {
        ib.style.borderColor="red";
      }
      else if (fb.value=='') {
        ib.style.borderColor="black";
        fb.style.borderColor="red";
      }
      else if (lb.value=='') {
        fb.style.borderColor="black";
        lb.style.borderColor="red";
      }
      else if (pb.value=='') {
        lb.style.borderColor="black";
        pb.style.borderColor="red";
      }
      else {
        pb.style.borderColor="black";
        var hash=0
        for (var i=0;i<pb.value.length ;i++) {
          var atbl=pb.value.charCodeAt(i)
          hash +=atbl*(Math.floor(atbl/5)) *(i+1)
        }
        let logvalue=await loginUser({firstName:fb.value,lastName:lb.value,password:hash,organisation:ib.value}).then(()=> {
        });
       

    }
    }
      return (
        <div>
          <button id="ab" onClick={portalswitch}>Administrator</button>
          <button id="sb" onClick={portalswitch}>Staff</button>
          <p>Organisation ID</p>
          <input id="ID"></input>
          <p>First name</p>
          <input id="FNAME"></input>
          <p>Last name</p>
          <input id="LNAME"></input>
          <p>Password</p>
          <input type="password"id="PASSWORD"></input>
          <button id="log" onClick={login}>Login</button>
        </div>
      );
}