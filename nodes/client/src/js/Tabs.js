import Sprofile from "../pages/Sprofile";
import Stask from "../pages/Stask";

export default function Tabs() {
    function tabswitch (e) {
        e.preventDefault();
        document.querySelector("#ttab").style.backgroundColor="white";
        document.querySelector("#ptab").style.backgroundColor="white";
        e.target.style.backgroundColor="black";
        if (e.target.innerText=="Tasks") {
            document.querySelector("#task").style.display="block";
            document.querySelector("#profile").style.display="none";
        }
        else if (e.target.innerText=="Profile") {
            document.querySelector("#profile").style.display="block";
            document.querySelector("#task").style.display="none";
        }
    }
    return (
        <div>
        <button  id="ttab"onClick={tabswitch}>Tasks</button>
        <button style={{backgroundColor:"black"}} id="ptab" onClick={tabswitch}>Profile</button>
        </div>
    )
}