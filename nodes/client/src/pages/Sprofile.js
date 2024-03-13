import { useEffect } from "react";
import Logout from "../js/Logout";
const L=require("leaflet")
//MAP CREDITS
export default function Sprofile() {
    let mapp=
    useEffect(()=> {
        try {
    var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
if (mapp==undefined) {
    mapp=map
}}
catch (error) {

}}
)
    function geo () {
        navigator.geolocation.getCurrentPosition(printo,maperror,{enableHighAccuracy:true});
    }
    function printo(position) {
        console.log(mapp)
        mapp.setView([position.coords.latitude,position.coords.longitude],15);
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
    <p>Name</p>
    </div>
    <div>
        <p style={{display:"inline"}}>Status:</p>
        <button style={{display:"inline"}}>Active</button>
    </div>
    
    <div>
        <p style={{display:"inline"}}>In office:</p>
        <button style={{display:"inline"}}>Yes</button>
    </div>

    <div>
        <p style={{display:"inline"}}>Location:</p>
        <button onClick={geo} style={{display:"inline"}}>Update</button>
        <div style={{height:200 + "px",width:800 +"px"}}id="map"></div>
    </div>
    </div>
    )
    
}