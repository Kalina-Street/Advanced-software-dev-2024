require('dotenv').config();
const path=require("path");
const cors=require('cors')
const sql=require("mssql")


class Database {
    
    config = {
    user: "azureuser",
    password: "Kgl0pp0str33t",
    server: "mysqlkstreet.database.windows.net",
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: "mySampleDatabase",
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

    poolconnection=null;
    connected=false;

    constructor() {
        console.log("Database config:  ${JSON.stringify(config)}");
    }
    async connect () {
        try {
            console.log("Database connecting... ${this.connected}")
            if (this.connected===false) {
                this.poolconnection=await sql.connect(this.config);
                this.connected=true;
            }
            else {
                console.log("already connected")
            }
        }
            catch (error) {
                console.error(JSON.stringify(error))
            }

    }

    async disconnect() {
        try {
            this.poolconnection.close();
            console.log("connection closed")
        }
        catch (error) {
            console.error(error)
        }
    }

    async executeQuery(query) {
        await this.connect();
        const request=this.poolconnection.request();
        const result=await request.query(query);
        return result.rowsAffected[0];
    }
    async create(data) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("id",sql.Int,data.id);
        request.input('firstName',sql.NVarChar(255),data.firstName);
        request.input('lastName',sql.NVarChar(255),data.lastName);
        request.input('status',sql.TinyInt,data.status);
        request.input('inoffice',sql.TinyInt,data.inoffice);
        request.input('lat',sql.Float,data.lat);
        request.input('long',sql.Float,data.long);

        const result= await request.query("INSERT INTO Person (id,firstname,lastname,status,inoffice,lat,long) VALUES (@id,@firstName,@lastName,@status,@inoffice,@lat,@long)");
        return result.rowsAffected[0];
    }
    async readAll() {
        await this.connect();
        const request=this.poolconnection.request();
        const result=await request.query("SELECT * FROM person");
        
        return result.recordset;
    }
    async read(id) {
        await this.connect();

        const request=this.poolconnection.request();
        const result=await request.input("id",sql.Int,id).query("SELECT * FROM Person where id=@id");

        return result.recordset[0];

    }
    async update(id,data) {
        await this.connect();

        const request=this.poolconnection.request();

        request.input("id",sql.Int,id);
        request.input('firstName',sql.VarChar(255),data.firstName);
        request.input('lastName',sql.VarChar(255),data.lastName);

        const result=await request.query("UPDATE Person set firstName=@firstName,lastName=@lastName WHERE id=@id");

        return result.rowsAffected[0];
    }

    async delete(id) {
        await this.connect();

        const idAsNumber=Number(id);
        const request=this.poolconnection.request();
        const result=await request.input("id",sql.Int,idAsNumber).query("Delete from person where id=@id");

        return result.rowsAffected[0];
    }

    async pushcoord(id,lat,long) {
      await this.connect();

      const request=this.poolconnection.request();
      request.input("id",sql.Int,id);
      request.input("lat",sql.Float,lat);
      request.input("long",sql.Float,long);
      const result=await request.query("UPDATE person SET lat=@lat ,long=@long WHERE id=@id")

      return result.rowsAffected[0];
    }


    async createtable() {
      await this.connect()

      const request=this.poolconnection.request();
      const result=await request.query("CREATE TABLE person (id int ,firstName VarChar(255), lastName varChar(255),status tinyint, inoffice tinyint,lat float, long float PRIMARY KEY (id))")

      return result.rowsAffected[0];
    }
    async droptable() {
      await this.connect()

      const request=this.poolconnection.request();
      const result=await request.query("DROP TABLE person")

      return result.rowsAffected[0];
    }
}
connector=new Database();
//connector.create({id:1,firstName:"Kalina",lastName:"Street",status:0,inoffice:0,lat:12.0,long:12.0});
// const app=require('../src/app');

const express = require('express');
const { connect } = require('http2');

const app = express();
app.use(cors());


PORT=process.env.PORT  || 4000;


app.get('/', (req,res)=>{
    res.send("hello from the server");
})

app.get('/person',async (req,res)=>{
    records=await connector.readAll();
    res.send(records);
})
app.post('/updatecoord',async (req,res)=>{
  const chunks = [];
  let data=""
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });
  req.on("end", async () => {
    data = Buffer.concat(chunks);
    console.log(data);
    const stringData = data.toString();
    const parse=JSON.parse(stringData);
    resul=await connector.pushcoord(parse.id,parse.lat,parse.long); 
    return resul;
  })
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
})
app.post("/loginc",(req,res)=>{
    res.send(JSON.parse(stringData));
});*/