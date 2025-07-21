const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  id: {type : String , requires:true , unique:true},
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Author", authorSchema);
