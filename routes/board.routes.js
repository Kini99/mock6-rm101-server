const express = require("express");
const { BoardModel } = require("../models/board.model");


const boardRouter = express.Router();

boardRouter.post("/", async(req,res)=>{
    try{
        const {name}=req.body;
        const board=new BoardModel({name});
        await board.save();
        // res.redirect("/board");
        res.send(board)
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

boardRouter.get("/", async(req,res)=>{
    try{
        const boards=await BoardModel.find();
        console.log(boards)
        // res.render('boards',{boards})
        res.send(boards)
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

module.exports = {
    boardRouter
}