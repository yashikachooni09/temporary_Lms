const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  edition: String,
  publisher: String,
  yearOfPublication: Number,
  pages: Number,
  isbn: String,
  department: String,
  course: String,
  cost: Number,
});

module.exports = mongoose.model("book", bookSchema);
