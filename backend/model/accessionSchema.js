const mongoose = require("mongoose");

const accessionSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startRange: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  }
});



module.exports = mongoose.model("AccessionTracker", accessionSchema);
