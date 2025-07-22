const mongoose = require("mongoose");
const bookCopySchema = new mongoose.Schema({
  copyId: {
    type: String, 
   
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
  },
 shelfLocation: { type: String, required: true } 
});
bookCopySchema.pre("save",async function(next){
  if(!this.copyId){
 this.copyId = `CP_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }
  next()
})

module.exports = mongoose.model("BookCopy",bookCopySchema);