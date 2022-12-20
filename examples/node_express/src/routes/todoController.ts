import express, { Request, Response } from "express";
import { Todo } from "../models/todo";
import { createTodoSchema } from "../validators/index";

const  router = express.Router();

router.route("/").post(async(req:Request,res:Response)=>{
    const {data} = req.body;
    if(!data) res.status(400).send('improper request')
    createTodoSchema.validate(data).then(async (result)=>{
        try{
            const todoItem = new Todo(result);
            let response = await todoItem.save();
            res.status(200).send(response)
        }catch(error:any){
            res.status(500).send(error.message)
        }
    }).catch(error=>{
        res.status(400).send(error.message)
    })
})

router.route("/:id").get((req:Request,res:Response)=>{

}).patch((req:Request,res:Response)=>{

}).delete((req:Request,res:Response)=>{

})

router.route("/:id/mark-status").patch((req:Request,res:Response)=>{

})

router.route("/all").get((req:Request,res:Response)=>{
    
})

export default router