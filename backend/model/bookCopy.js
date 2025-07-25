const mongoose = require("mongoose");

const bookCopySchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  accessionNumber: { type: Number, required: true, unique: true },
  rackNo: String,
  shelfNo: Number,
});

module.exports = mongoose.model("bookCopie", bookCopySchema);
