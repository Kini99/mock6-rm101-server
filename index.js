const express=require("express");
const {connection} =require("./db");
const cors=require("cors");
const { boardRouter } = require("./routes/board.routes");
const { taskRouter } = require("./routes/task.routes");
const { subtaskRouter } = require("./routes/subtask.routes");

const app=express();
app.use(cors())
app.use(express.json());

app.use("/board", boardRouter);
app.use("/board/:boardId/task", taskRouter);
app.use("/subtask",subtaskRouter);

app.listen(8080, async()=>{
try{
    await connection;
    console.log("Server running, DB connected");
}catch(err){
    console.log(err);
}
})