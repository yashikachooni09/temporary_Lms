// controllers/studentDashboardController.js
const Issue = require("../model/issueSchema");
const BookCopy = require("../model/bookCopy");
const Book = require("../model/bookSchema");

// exports.getStudentDashboardData = async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     const issuedBooks = await Issue.find({ user: studentId }).populate({
//       path: "bookCopy",
//       populate: {
//         path: "book", // nested populate
//         model: "book"
//       }
//     });

//     const totalIssued = issuedBooks.length;
//     const totalReturned = issuedBooks.filter(b => b.returnDate).length;
//     const pendingReturns = totalIssued - totalReturned;
//     const totalFine = issuedBooks.reduce((sum, b) => sum + (b.fine || 0), 0);

//     // Monthly stats
//     const monthlyIssued = Array(12).fill(0);
//     const monthlyReturned = Array(12).fill(0);

//     issuedBooks.forEach((b) => {
//       const issuedMonth = new Date(b.issueDate).getMonth();
//       monthlyIssued[issuedMonth]++;
//       if (b.returnDate) {
//         const returnMonth = new Date(b.returnDate).getMonth();
//         monthlyReturned[returnMonth]++;
//       }
//     });

//     res.json({
//       totalIssued,
//       totalReturned,
//       pendingReturns,
//       totalFine,
//       monthlyIssued,
//       monthlyReturned
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Dashboard data fetch failed" });
//   }
// };

// controller/issuedBooks.js


exports.getIssuedBooksByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const issuedBooks = await Issue.find({ user: id, status: "issued" })
      .populate({ 
        path: "bookCopie", 
        populate: {   
          path: "book", 
          model: "book" 
        }
      });

    res.status(200).json(issuedBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch issued books" });
  }
};
