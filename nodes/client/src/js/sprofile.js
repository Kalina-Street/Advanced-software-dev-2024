import axios from "axios"
function task() { axios.get('http://localhost:8000/stask',{mode:"cors"}).then((data)=> {
    console.log(data.data)
        document.querySelector("#root").innerHTML=data.data;
        document.querySelector("#root").innerHTML=document.querySelector("#container").innerHTML
      })
    };