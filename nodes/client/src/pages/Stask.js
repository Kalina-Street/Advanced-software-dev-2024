import Filler from "../js/Filler";
import Tasktab from "../js/Tasktab";
import axios from "axios";

export default function Stask() {
    async function postnote(e) {
        e.preventDefault();
        var id=document.querySelector("#notevalue").innerText;
        var note=document.querySelector("#notevalue").value;
        e.target.innerText="pending..."
        await axios.post('http://localhost:8000/newnote',JSON.stringify({"task":id,"description":note}),{mode:"cors"}).then((data)=> {
            closer();
        })
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
        <Filler id="Routine" style={{display:"none"}}></Filler>
        <Filler id="Other" style={{display:"none"}}></Filler>
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