const mongoose = require("mongoose");
const bookCopySchema = new mongoose.Schema({
  copyId: {
    type: String, 
    required: true,
    unique: true
  },
   bookId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Book",                           
    required: true
  },
  status: {
    type: String,
    enum: ["available", "issued", "damaged", "lost"],
    default: "available"
  },
  addedOn: {
    type: String, 
    required: true
  }
});
bookCopySchema.pre("save",async function(next){
  if(!this.copyId){
    const count=mongoose.model("BookCopy").countDocuments()
    this.copyId=`CP_${1+count}`
  }
  next()
})

module.exports = mongoose,model("BookCopy",bookCopySchema);