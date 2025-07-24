const mongoose = require("mongoose");

const accessionSchema = new mongoose.Schema({
  department: { type: String, required: true, unique: true },  
  startRange: { type: Number, required: true },                
  current: { type: Number, required: true }                  
});

module.exports = mongoose.model("AccessionNumber", accessionSchema);
