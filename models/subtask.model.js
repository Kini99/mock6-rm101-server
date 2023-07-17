const mongoose=require("mongoose");

const subtaskSchema=mongoose.Schema({
       title : String,
       isCompleted : Boolean
   },{
    versionKey:false
})

const SubtaskModel=mongoose.model("subtask",subtaskSchema);

module.exports={
    SubtaskModel
}