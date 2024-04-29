import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  async function loginUser(credentials) {
    document.querySelector("#log").innerText="processing..."
    document.querySelector("#axiosnotif").style.display="none";
    if (window.navigator.onLine===true) {
      document.querySelector("#connectionnotif").style.display="none";
    await axios.post('http://localhost:8000/login',JSON.stringify(credentials),{mode:"cors"}).then((data)=> {
      document.querySelector("#log").innerText="Submit"
    if (!data.data) {
      document.querySelector("#loginerror").innerText="User not found";
    }
    else {
    localStorage.setItem('user-token', data.data.id);
    localStorage.setItem('auth-token', "authed");
    localStorage.setItem('admin-token', data.data.admin);
    if (data.data.admin===0) { 
    navi("/SHome")
    }
    else if (data.data.admin===1) {
      navi("/AHome")
    }
    else {
      console.log("User is neither admin or staff, contact your supervisor")
    }
    return true;
    }
    }).catch(error => {
      document.querySelector("#axiosnotif").style.display="block";
  })
  }
  else {
    document.querySelector("#connectionnotif").style.display="block";
  }
  }
  const navi=useNavigate();
  var admin=false

    async function login(e) {
      e.preventDefault();
      var borderc="light-dark(rgb(118, 118, 118), rgb(133, 133, 133))"
      const ib=document.querySelector("#ID");
      const fb=document.querySelector("#FNAME")
      const lb=document.querySelector("#LNAME")
      const pb=document.querySelector("#PASSWORD")
      ib.style.borderColor=borderc;
      fb.style.borderColor=borderc;
      lb.style.borderColor=borderc;
      pb.style.borderColor=borderc;
      var describer=document.querySelector("#loginerror")
      describer.innerText=""
      
      if (ib.value==='') {
        describer.innerText="Organisation cannot be blank"
        ib.style.borderColor="red";
        
      }
      else if (Number.isFinite(parseInt(ib.value))===false) {
        ib.style.borderColor="red";
        describer.innerText="Organisation should be a number"
      }
      else if (fb.value==='') {
        ib.style.borderColor=borderc;
        fb.style.borderColor="red";
        describer.innerText="First name cannot be blank"
      }
      else if (lb.value==='') {
        describer.innerText="Last name cannot be blank"
        fb.style.borderColor=borderc;
        lb.style.borderColor="red";
      }
      else if (pb.value==='') {
        describer.innerText="Password cannot be blank"
        lb.style.borderColor=borderc;
        pb.style.borderColor="red";
      }
      else {
        pb.style.borderColor="none";
        var hash=0
        for (var i=0;i<pb.value.length ;i++) {
          var atbl=pb.value.charCodeAt(i)
          hash +=atbl*(Math.floor(atbl/5)) *(i+1)
        }
        await loginUser({firstName:fb.value.toString(),lastName:lb.value.toString(),password:hash,organisation:parseInt(ib.value)})
       
    }
    }
      return (
        <div>
          {/*<button id="ab" onClick={portalswitch}>Administrator</button>*/}
          {/*<button id="sb" onClick={portalswitch}>Staff</button>*/}
          <p>Organisation ID</p>
          <input id="ID"></input>
          <p>First name</p>
          <input id="FNAME"></input>
          <p>Last name</p>
          <input id="LNAME"></input>
          <p>Password</p>
          <input type="password"id="PASSWORD"></input>
          <p id="loginerror"></p>
          <button id="log" onClick={login}>Login</button>
        </div>
      );
}