const mongoose=require("mongoose");

const connection=mongoose.connect(`mongodb+srv://kinjal:Kinjal099@cluster0.pooiylr.mongodb.net/board?retryWrites=true&w=majority`);

module.exports={
    connection
}