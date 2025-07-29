const express = require("express")
const router = express.Router();
const  {getStudentDashboardData} = require("../controller/studentDashboard");
const { getIssuedBooksByStudent } = require("../controller/issuedBooks");

// router.get("/student/:id/dashboard", getStudentDashboardData);
router.get("/student/:id/books", getIssuedBooksByStudent);

module.exports = router;