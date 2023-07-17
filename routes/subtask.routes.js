const express = require("express");
const { BoardModel } = require("../models/board.model");
const { TaskModel } = require("../models/task.model");
const { SubtaskModel } = require("../models/subtask.model");


const subtaskRouter = express.Router();

subtaskRouter.post("/", async(req,res)=>{
    try{
        const {title,isCompleted}=req.body;
        const subtask=new TaskModel({title,isCompleted});
        await subtask.save();
        res.redirect("/tasks");
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

subtaskRouter.put("/:id", async(req,res)=>{
    try{
        const {subtaskId}= req.params;
        const {title,isCompleted}=req.body;
        const updatedSubtask=await SubtaskModel.findByIdAndUpdate(
            subtaskId,{title,isCompleted}
        )
        res.json(updatedSubtask);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

subtaskRouter.delete("/:id", async(req,res)=>{
    try{
        const {subtaskId}= req.params;
        await SubtaskModel.findByIdAndDelete(subtaskId);
        res.status(200);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

module.exports = {
    subtaskRouter
}