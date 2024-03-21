/*import { express } from "express";
import Database from "../../../config/database";

const router=express.Router();
router.use(express.json());

const database=new Database();

router.get("/",async (_,res) => {
    try {
        const persons=await database.readAll();
        console.log("persons: $JSON.stringify(persons)")
    }
    catch (err) {
        res.status(500).json({error:err?.message})
    }
})
router.post("/",async (req,res)=>{
    try{
        const person=req.body;
        const rowsAffected=await database.create(person);
    }
    catch (err) {
        res.status(500).json({error:err?.message})
    }
})
router.get("/:id", async (req,res) => {
    try {
        const personID=req.params.id;
        if(personID) {
            const result=await database.read(personID);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        res.status(500).json({error:err?.message})
    }
})
router.put(":/id",async (req,res) => {
    try {
        const personID=req.params.id;
        const person=req.body;

        if (personID && person) {
            delete person.id
            const rowsAffected=await database.update(personID,person);
        }
        else {
            res.status(400);
        }
    }
    catch (err) {
        res.status(500).json({error:err?.message})
    }
})

router.delete("/:id",async (req,res) =>  {
    try {
        const personID=req.params.id;

        if (!personID) {
            res.status(404);
        }
        else {
            const rowsAffected=await database.delete(personID);
        }
    }
    catch (err) {
        res.status(500).json({error:err?.message})
    }
})*/