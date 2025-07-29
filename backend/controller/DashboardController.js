const Book = require("../model/bookSchema");
const issueBook = require("../model/issueSchema");

exports.totalStats = async(req,res)=>
{
     try {
    const totalBooks = await Book.countDocuments();
    const issuedBooks = await issueBook.countDocuments({ status: 'issued' });
    const returnedBooks = await issueBook.countDocuments({ status: 'returned' });
    // const overdueBooks = await issueBook.countDocuments({ status: 'overdue' });

    res.json({ totalBooks, issuedBooks, returnedBooks, overdueBooks });
  } catch (error) {
    console.error("Error in totalStats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
