import { useEffect } from "react";
import Logout from "../js/Logout";
import axios from "axios";

const L=require("leaflet")
//MAP CREDITS
export default function Sprofile() {
    let user=0
    let mapp=null
    useEffect(()=> {

        try {
    var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
if (mapp==undefined) {
    mapp=map
}
axios.post('http://localhost:8000/person',{id:localStorage.getItem("user-token")},{mode:"cors"}).then((data)=> {
    console.log(data.data)
    var info=data.data;
    user=data.data.id;
    document.querySelector("#fullname").innerText=info.firstName + " " + info.lastName;
    if (info.status===1) {
        document.querySelector("#status").innerText="Active";
    }
    if (info.inoffice===1) {
        document.querySelector("#office").innerText="Active";
    }
    mapp.setView([info.lat,info.long],15);
})}
catch (error) {

}}
)
    function geo () {
        navigator.geolocation.getCurrentPosition(printo,maperror,{enableHighAccuracy:true});
    }
    function printo(position) {
        mapp.setView([position.coords.latitude,position.coords.longitude],15);
        axios.post('http://localhost:8000/updatecoord',{lat:position.coords.latitude,long:position.coords.longitude,id:user}) 
    }
    function maperror(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
               alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
               alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
               alert("An unknown error occurred.")
                break;
          }
    }
    return (
        <div style={{display:"block"}} id="profile">
            <div>
    <img src=""></img>
    <p id="fullname">Name</p>
    </div>
    <div>
        <p style={{display:"inline"}}>Status:</p>
        <button id="status" style={{display:"inline"}}>Inactive</button>
    </div>
    
    <div>
        <p style={{display:"inline"}}>In office:</p>
        <button id="office" style={{display:"inline"}}>No</button>
    </div>

    <div>
        <p style={{display:"inline"}}>Location:</p>
        <button onClick={geo} style={{display:"inline"}}>Update</button>
        <div style={{height:200 + "px",width:800 +"px"}}id="map"></div>
    </div>
    </div>
    )
    
}