import { useEffect } from "react"
import axios from "axios";

export default function Filler(props) {
    let hasfetched=false;
    function opener() {
        document.querySelector("#notetitle").innerText=this.parentElement.parentElement.querySelector(".titleid").innerText;
        document.querySelector("#notetitle").title=this.parentElement.parentElement.id;
        document.querySelector("#notegallery").style.display="none";
        document.querySelector("#notepopup").style.display="block";
        document.querySelector("#nonpopup").style.display="none";
    }
    async function openertwo() {
        var id=this.parentElement.parentElement.id;
        document.querySelector("#notetitletwo").title=id;
        document.querySelector("#notetitletwo").innerText=this.parentElement.parentElement.querySelector(".titleid").innerText;
        await axios.post('http://localhost:8000/notes',JSON.stringify({"id":id}),{mode:"cors"}).then((data)=> {
            var noteslist=data.data;
            console.log(noteslist);
            for (var w=0;w<noteslist.length;w++) {
                var tempnote=document.createElement("p");
                tempnote.classList.add("tempnote")
                tempnote.innerText="note " + (w+1).toString() + ": " +noteslist[w].description;

                document.querySelector("#notegallery").insertBefore(tempnote,document.querySelector("#gallerycloser"));
            }
        })
        document.querySelector("#notegallery").style.display="block";
        document.querySelector("#nonpopup").style.display="none";
    }

    async function completer() {
        var id=this.parentElement.parentElement.id;
        await axios.post('http://localhost:8000/completetask',JSON.stringify({"id":id}),{mode:"cors"}).then((data)=> {
                this.parentElement.parentElement.remove();
        })
    }

    useEffect( ()=> {
        async function tasker() {
            hasfetched=true;
        await axios.post('http://localhost:8000/tasks',JSON.stringify(props.id),{mode:"cors"}).then(async (data)=> {
            console.log(data)
      let tasklist=data.data;
      let dateob=new Date();
      for (var i=0;i<tasklist.length;i++) {
        let tempdiv=document.createElement("div");
        tempdiv.id=tasklist[i].id;

        let temptitle=document.createElement("p");
        temptitle.classList.add("titleid")
        temptitle.innerText=tasklist[i].title;
        let tempdesc=document.createElement("p");
        tempdesc.innerText=tasklist[i].description;
        tempdiv.appendChild(temptitle);
        tempdiv.appendChild(tempdesc);

        let tempprogress=document.createElement("p");
        tasklist[i].startdate=tasklist[i].startdate.replace("T00:00:00.000Z","")
        var begindate=new Date(tasklist[i].startdate).getTime();
        var targetdate=dateob.getTime();
        var datestring=(dateob.getFullYear()).toString() +"-"+ (dateob.getMonth()+1).toString() +"-"+ (dateob.getDate()).toString()
        console.log(datestring)
        if (props.id=="Routine") {
            if (begindate+tasklist[i].duration-targetdate.toFixed(2)<=0) {
                begindate=targetdate;
                await axios.post('http://localhost:8000/timereset',JSON.stringify({"date":begindate,"id":tasklist[i].id}),{mode:"cors"}).then((data)=> {
            })
            }
        }
        tempprogress.innerText=(((begindate+tasklist[i].duration)-targetdate)/1000/60/60).toFixed(2)+" hours remaining";

        var indiv=document.createElement("div");
        var viewnote=document.createElement("button");
        viewnote.innerText="View notes";
        viewnote.style.display="inline";
        viewnote.onclick=openertwo;

        var addnote=document.createElement("button");
        addnote.innerText="Add note";
        addnote.style.display="inline";
        addnote.onclick=opener;
        
        var complete=document.createElement("button");
        complete.style.display="inline";
        complete.innerText="Complete task";
        complete.onclick=completer;

        indiv.appendChild(viewnote);
        indiv.appendChild(addnote);
        indiv.appendChild(complete);

        tempdiv.appendChild(tempprogress);
        tempdiv.appendChild(indiv);

        document.querySelector("#" + props.id).appendChild(tempdiv);
      }
    })
}   
if (hasfetched===false) {
    tasker();
}
    })
    return (
        <div id={props.id} style={{display:props.display,overflowY:"scroll",height:80 + "vh"}}className="filler"></div>
    )
}