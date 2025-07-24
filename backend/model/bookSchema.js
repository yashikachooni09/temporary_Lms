

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  accessionNo: { type: Number, required: true, unique: true },//auto-generated

  title: { type: String, required: true },
  author: { type: String, required: true },
  edition: { type: String },
  publisher: { type: String },
  yearOfPublication: { type: String },

  department: { type: String, required: true }, 
  course: { type: String, required: true },    

  cost: { type: Number, required: true },
  pages:{type:Number},
  isbn: { type: String }, 
  vendorName: { type: String },
  billNo: { type: String },
  billDate: { type: String },

  entryDate: { type: String, required: true },

  rackNo: { type: String, required: true },
  shelfNo: { type: String, required: true },

  status: {
    type: String,
    enum: ["available", "issued", "damaged", "lost"],
    default: "available"
  },

  addedBy: { type: String }
});

module.exports = mongoose.model("Book", bookSchema);
