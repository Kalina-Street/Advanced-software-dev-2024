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

app.listen(PORT,() => {
    console.log('server listening on ' +PORT);
})