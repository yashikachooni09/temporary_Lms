const mongoose = require("mongoose");

const accessionSchema = new mongoose.Schema({
  department: { type: String, required: true },  // e.g. Computer
  course: { type: String, required: true },      // e.g. MCA
  title: { type: String, required: true },       // e.g. Java

  startRange: { type: Number, required: true },
  endRange: { type: Number, required: true },
  current: { type: Number, required: true }
});



module.exports = mongoose.model("AccessionNumber", accessionSchema);
