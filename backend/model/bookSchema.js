const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true
    }
  ],

  edition: String,
  volume: String,
  publisher: String,
  publishedYear: String, 
  pages: Number,   

  entryDate: {
    type: String,
    required: true
  },

  billNumber: String,
  billDate: String, 
  vendorName: String,
  costOnBill: Number, 

  department: String, 
  copyCount: {
    type: Number,
    default: 0
  },

  image: String 
});

module.exports = mongoose.model("Book", bookSchema);
