const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
  
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
bookSchema.pre("save",async function(next){
    if(!this.bookId){
        const count=await mongoose.model("Book").countDocuments()
        this.bookId=`BK_${1+count}`
    }
    next()
})

module.exports = mongoose.model("Book", bookSchema);
