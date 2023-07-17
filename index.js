const express=require("express");
const {connection} =require("./db");
const { userRouter } = require("./routes/user.routes");
const cors=require("cors");

const app=express();
app.use(cors())
app.use(express.json());

app.use("/", userRouter);

app.listen(8080, async()=>{
try{
    await connection;
    console.log("Server running, DB connected");
}catch(err){
    console.log(err);
}
})