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
    async createuser(data) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("id",sql.Int,data.id);
        request.input('firstName',sql.NVarChar(255),data.firstName);
        request.input('lastName',sql.NVarChar(255),data.lastName);
        request.input('password',sql.Int,data.password);
        request.input('organisation',sql.Int,data.organisation);
        request.input('status',sql.TinyInt,data.status);
        request.input('inoffice',sql.TinyInt,data.inoffice);
        request.input('lat',sql.Float,data.lat);
        request.input('long',sql.Float,data.long);

        const result= await request.query("INSERT INTO Person (id,firstname,lastname,password,organisation,status,inoffice,lat,long) VALUES (@id,@firstName,@lastName,@password,@organisation,@status,@inoffice,@lat,@long)");
        return result.rowsAffected[0];
    }

   
    async personAll() {
        await this.connect();
        const request=this.poolconnection.request();
        const result=await request.query("SELECT * FROM person");

        return result.recordset;
    }
    async readPerson(id) {
        await this.connect();

        const request=this.poolconnection.request();
        const result=await request.input("id",sql.Int,id).query("SELECT * FROM Person where id=@id");
       

        return result.recordset[0];

    }
    async updatePerson(id,data) {
        await this.connect();

        const request=this.poolconnection.request();

        request.input("id",sql.Int,id);
        request.input('firstName',sql.VarChar(255),data.firstName);
        request.input('lastName',sql.VarChar(255),data.lastName);

        const result=await request.query("UPDATE Person set firstName=@firstName,lastName=@lastName WHERE id=@id");

        return result.rowsAffected[0];
    }

    async deletePerson(id) {
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

    async officechange(id,inoffice) {
        await this.connect();
  
        const request=this.poolconnection.request();
        request.input("id",sql.Int,id);
        request.input("inoffice",sql.TinyInt,inoffice);
        const result=await request.query("UPDATE person SET inoffice=@inoffice WHERE id=@id")
  
        return result.rowsAffected[0];
      }

    async statuschange(id,status) {
    await this.connect();

    const request=this.poolconnection.request();
    request.input("id",sql.Int,id);
    request.input("status",sql.TinyInt,status);
    const result=await request.query("UPDATE person SET status=@status WHERE id=@id")

    return result.rowsAffected[0];
    }

    async verifylogin(firstName,lastName,password,organisation) {
        await this.connect();

        const request=this.poolconnection.request();
        request.input("firstname",sql.VarChar(255),firstName);
        request.input("lastname",sql.VarChar(255),lastName);
        request.input("password",sql.Int,password);
        request.input("organisation",sql.Int,organisation);

        const result=await request.query("SELECT id FROM person WHERE firstname=@firstname AND lastname=@lastname AND password=@password AND organisation=@organisation");
        return result.recordset[0];
    }

    async createtask(data) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("id",sql.Int,data.id);
        request.input('title',sql.NVarChar(255),data.title);
        request.input('description',sql.NVarChar(500),data.description);
        request.input('category',sql.NVarChar(30),data.category);
        request.input('startdate',sql.Date,data.date);
        request.input('duration',sql.Int,data.duration);
        request.input("organisation",sql.Int,data.organisation);
        request.input('complete',sql.TinyInt,0);

        const result= await request.query("INSERT INTO tasks (id,title,description,category,startdate,duration,organisation,complete) VALUES (@id,@title,@description,@category,@startdate,@duration,@organisation,@complete)");
        return result.rowsAffected[0];
    }

    async taskAll() {
        await this.connect();
        const request=this.poolconnection.request();
        const result=await request.query("SELECT * FROM tasks");
        
        return result.recordset;
    }
    async taskcat(category) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("category",sql.NVarChar(30),category);
        const result=await request.query("SELECT * FROM tasks WHERE category=@category AND complete=0");
        
        return result.recordset;
    }

    async taskcomplete(id) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("id",sql.Int,id);
        const result=await request.query("UPDATE tasks SET complete=1 WHERE id=@id");
        
        return result.rowsAffected[0];
    }

    async timereset(id,date) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input('id',sql.Int,id);
        request.input('startdate',sql.Date,date);
        const result=await request.query("UPDATE tasks SET startdate=@startdate WHERE id=@id");
        
        return result.rowsAffected[0];
    }

    async newnote(note) {
        await this.connect();

        const request=this.poolconnection.request();

        const maxid=await request.query("SELECT MAX(id) AS id FROM notes");
        console.log(maxid.recordset);
        if (maxid.recordset[0].id==null) {
        }
        request.input("description",sql.NVarChar(500),note.description);
        request.input("task",sql.Int,note.task);
        request.input("id",sql.Int,maxid.recordset[0].id+1);
        const result=await request.query("Insert into notes (id,task,description) VALUES (@id,@task,@description)");
        
        return result.rowsAffected[0];
    }
    async notesAll(id) {
        await this.connect();
        const request=this.poolconnection.request();
        request.input("task",sql.Int,id)
        const result=await request.query("SELECT * FROM notes WHERE task=@task");
        return result.recordset;
    }


    async createtable() {
      await this.connect()

      const request=this.poolconnection.request();
      //const result=await request.query("CREATE TABLE tasks (id int ,title VarChar(255), description varChar(500),category VarChar(30),startdate DATE,duration int,organisation int,complete tinyint, PRIMARY KEY (id))")
    const result=await request.query("CREATE table notes (id int,task int, description VarChar(500), PRIMARY KEY (id)) ")

      return result.rowsAffected[0];
    }
    async droptable() {
      await this.connect()

      const request=this.poolconnection.request();
      const result=await request.query("DROP TABLE person")

      return result.rowsAffected[0];
    }

}
let connector=new Database();

//connector.createtable();

//connector.createtask({id:1,title:"urgent1",description:"Sample urgent task",category:"Urgent",date:fulldate,duration:10000,organisation:1,complete:0});
//connector.createtask({id:2,title:"routine1",description:"Sample routine task",category:"Routine",date:fulldate,duration:10000,organisation:1,complete:0});
//connector.createtask({id:3,title:"other1",description:"Sample other task",category:"Other",date:fulldate,duration:10000,organisation:1,complete:0});

//async function fet() { console.log(await connector.taskAll());}
//fet();

const express = require('express');
const { connect } = require('http2');

const app = express();
app.use(cors());


PORT=process.env.PORT  || 4000;


app.get('/', (req,res)=>{
    res.send("hello from the server");
})

app.post('/person',async (req,res)=>{
    let chunks=[]
    req.on("data",async (chunk) => {
        chunks.push(chunk);
      });
    req.on("end",async ()=> {
        var user=await datachunk(chunks)
    records=await connector.readPerson(user.id);
    res.send(records);
    })
})
app.post('/updatecoord',async (req,res)=>{
    let chunks=[]
    req.on("data",async (chunk) => {
        chunks.push(chunk);
      });
    req.on("end",async ()=> {
        parse=await datachunk(chunks)
    resul=await connector.pushcoord(parse.id,parse.lat,parse.long); 
    return resul;
    })
  })

app.post('/login', async (req,res)=>{
   let chunks=[]
    req.on("data",async (chunk) => {
        chunks.push(chunk);
      });
    req.on("end",async ()=> {
        
        using=await datachunk(chunks)
        
         user=await connector.verifylogin(using.firstName,using.lastName,using.password,using.organisation);
            res.send(user);
    })
 
})

app.post('/tasks', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         
         let cat=await datachunk(chunks)
         
          let tasks=await connector.taskcat(cat);
             res.send(tasks);
     })
  
 })

 app.post('/newnote', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         
         let note=await datachunk(chunks)
         
          let result=await connector.newnote(note);
          res.send(200);
     })
    })

     app.post('/notes', async (req,res)=>{
        let chunks=[]
         req.on("data",async (chunk) => {
             chunks.push(chunk);
           });
         req.on("end",async ()=> {
             
             let id=await datachunk(chunks)
             
              let result=await connector.notesAll(id.id);
              res.send(result);
         })
  
 })

 app.post('/completetask', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         
         let id=await datachunk(chunks)
         
          let result=await connector.taskcomplete(id.id);
          res.send({"result":result});
     })

})


app.post('/officechange', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         
         let id=await datachunk(chunks)
         
          let result=await connector.officechange(id.id,id.inoffice);
          res.send({"result":result});
     })

})


app.post('/statuschange', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         
         let id=await datachunk(chunks)
        
         let result=await connector.statuschange(id.id,id.status);
         res.send({"result":result});
     })

})


app.post('/timereset', async (req,res)=>{
    let chunks=[]
     req.on("data",async (chunk) => {
         chunks.push(chunk);
       });
     req.on("end",async ()=> {
         let id=await datachunk(chunks)
        
         let result=await connector.timereset(chunks.id,chunks.date);
         res.send({"result":result});
     })

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

async function datachunk(chunks) {
     
      data =  Buffer.concat(chunks);
      const stringData = data.toString();
      const parse= JSON.parse(stringData);
      data=parse;
    return data;
}
  