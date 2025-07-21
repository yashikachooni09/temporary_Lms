const express=require("express")
const router=express.Router()
const bookController=require("../controller/booksController")
router.post("/add-books",bookController.addBooks)
module.exports=router;