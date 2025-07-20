const express=require("express")
const router=express.Router()
// const verifyToken=require("../middleware/authMiddleware")
const controller=require("../controller/adminController")
router.post("/signup",controller.signup)
router.post("/login",controller.login)
module.exports=router;