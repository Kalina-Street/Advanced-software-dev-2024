require('dotenv').config();
const path=require("path");
const cors=require('cors')


// const app=require('../src/app');

const express = require('express');

const app = express();
app.use(cors());


PORT=process.env.PORT  || 4000;


app.get('/', (req,res)=>{
    res.send("hello from the server");
})

app.get('/login', (req,res)=>{
    res.send("authed")
})

app.listen(PORT,() => {
    console.log('server listening on ' +PORT);
})

/*const chunks = [];
let data=""
req.on("data", (chunk) => {
  chunks.push(chunk);
});
req.on("end", () => {
  data = Buffer.concat(chunks);
  const stringData = data.toString();
  console.log("stringData: ", JSON.parse(stringData)); 
app.post("/loginc",(req,res)=>{
    res.send(JSON.parse(stringData));
})
});*/