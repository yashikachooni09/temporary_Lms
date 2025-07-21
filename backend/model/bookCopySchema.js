const mongoose = require("mongoose");
const BookCopySchema = new mongoose.Schema({
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

module.exports = mongoose,model("BookCopy",BookCopySchema);