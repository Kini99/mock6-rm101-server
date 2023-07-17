const express = require("express");
const { BoardModel } = require("../models/board.model");
const { TaskModel } = require("../models/task.model");


const taskRouter = express.Router();

taskRouter.post("/", async(req,res)=>{
    try{
        const {title,description,status,subtask,boardId}=req.body;
        const task=new TaskModel({title,description,status,subtask});
        await task.save();
        if(boardId){
            const board=await BoardModel.findById(boardId);
            if(board){
                board.tasks.push(task);
                await board.save();
            }
        }
        res.redirect("/board");
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

taskRouter.get("/", async (req, res) => {
    try {
      const { id } = req.body;
      const task = await TaskModel.find({ id });
      res.send(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

taskRouter.put("/:id", async(req,res)=>{
    try{
        const {taskId}= req.params;
        const {title,description,status, subtask}=req.body;
        const updatedTask=await TaskModel.findByIdAndUpdate(
            taskId,{title,description,status,subtask}
        )
        res.json(updatedTask);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

taskRouter.delete("/:id", async(req,res)=>{
    try{
        const {taskId}= req.params;
        await TaskModel.findByIdAndDelete(taskId);
        res.status(200);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

module.exports = {
    taskRouter
}