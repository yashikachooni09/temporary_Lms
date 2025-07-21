const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  authorId: {type : String  , unique:true},
  name: { type: String, required: true, unique: true }
});
authorSchema.pre("save",async function(next){
  if(!this.authorId){
    const count=await mongoose.model("Author").countDocuments();
    this.authorId=`AUTH_${1+count}`
  }
  next()

})

module.exports = mongoose.model("Author", authorSchema);
