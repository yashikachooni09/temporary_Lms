const mongoose=require("mongoose")
const bookCopySchema = require("./bookCopySchema")
const bookHistorySchema=new mongoose.Schema({
    historyId:{
        type:String,
        required:true,
        unique:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId
    },
    type:String,
    previousValues:{
        type:Object,
        required:true
    },
    updatedBy:{
        type:String
    }


},{timestamps:true})
bookHistorySchema.pre("save",async function(next){
    if(!this.historyId){
        this.historyId=`HIST_${Date.now()}_${Math.floor(Math.random()*1000)}`
    }
    next()

})


module.exports=mongoose.model("BookHistory",bookHistorySchema)