const express = require("express");
const { BoardModel } = require("../models/board.model");
const { TaskModel } = require("../models/task.model");


const taskRouter = express.Router();

taskRouter.post("/", async(req,res)=>{
    try{
        const {boardId,title,description,status,subtask}=req.body;
        const task=new TaskModel({title,description,status,subtask});
        await task.save();
        if(boardId){
            const board = await BoardModel.findById(boardId);
            if (board) {
                board.tasks.push(task);
                await board.save();
              }
            }
            res.status(201).json(task);
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

taskRouter.get("/", async (req, res) => {
    try {
      const { id } = req.query;
      const tasks = await TaskModel.find({ boardId: id });
      res.send(tasks);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  taskRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, subtask } = req.body;
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, status, subtask },
        { new: true }
      );
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  taskRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await TaskModel.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = {
    taskRouter
}