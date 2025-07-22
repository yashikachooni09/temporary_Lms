const multer=require("multer")
const path=require("path")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        const ext=path.extname(file.originalname)
        const name=path.basename(file.originalname,ext)
        const uniqueName=`${Date.now()}_${name}${ext}`
        cb(null,uniqueName)
    }
})
 const fileFilter=function(req,file,cb){
    const allowedTypes=/jpeg|jpg|png/;
    const isExtValid=allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const isMimeValid=allowedTypes.test(file.mimetype)
     if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, jpeg, png) are allowed!"));
  }

}
const upload=multer({
    storage:storage,
    fileFilter,
     limits: { fileSize: 2 * 1024 * 1024 }
})
module.exports=upload