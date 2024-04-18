import Filler from "../js/Filler";
import Tasktab from "../js/Tasktab";
import axios from "axios";

export default function Stask() {
    async function postnote(e) {
        if (window.navigator.onLine===true) {
            document.querySelector("#connectionnotif").style.display="none";
        e.preventDefault();
        var id=document.querySelector("#notetitle").title;
        var note=document.querySelector("#notevalue").value;
        e.target.innerText="sending..."
        await axios.post('http://localhost:8000/newnote',JSON.stringify({"task":id,"description":note}),{mode:"cors"}).then((data)=> {
            closer();
        })
    }
    else {
        document.querySelector("#connectionnotif").style.display="block";
    }
    }
    function closer() {
        document.querySelector("#notepopup").style.display="none";
        document.querySelector("#notegallery").style.display="none";
        var notes=document.querySelectorAll(".tempnote");
        for (var i=0;i<notes.length;i++) {
            notes[i].remove();
        }
        document.querySelector("#nonpopup").style.display="block";
        document.querySelector("#notevalue").value=""
    }
    return (
        <div style={{display:"none"}} id="task">
            <div id="nonpopup">
    <p>Task page</p>
    <div>
        <Tasktab text="Urgent" colour="black"></Tasktab>
        <Tasktab text="Routine" colour="white"></Tasktab>
        <Tasktab text="Other" colour="white"></Tasktab>
    </div>
    <div>
        <Filler id="Urgent" display="block"></Filler>
        <Filler id="Routine" display="none"></Filler>
        <Filler id="Other" display="none"></Filler>
    </div>
    </div>
    <div style={{display:"none"}} id="notepopup">
        <p id="notetitle"></p>
        <p>Details</p>
        <textarea id="notevalue"></textarea>
        <button onClick={closer}>Close</button>
        <button onClick={postnote}>Submit</button>
    </div>
    <div style={{display:"none"}} id="notegallery">
        <p id="notetitletwo"></p>
        <button id="gallerycloser" onClick={closer}>Close</button>
    </div>
    </div>
    )
}