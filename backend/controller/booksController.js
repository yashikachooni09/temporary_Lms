// const Author = require("../model/Author");
// const Book = require("../model/bookSchema");
// const BookCopy = require("../model/bookCopySchema");

// exports.addBooks = async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       edition,
//       volume,
//       publisher,
//       publishedYear,
//       pages,
//       entryDate,
//       billNumber,
//       billDate,
//       vendorName,
//       costOnBill,
//       department,
//       copyCount,
//       shelfLocation
//     } = req.body;

//     // Case-insensitive search for author
//     const author = await Author.findOne({
//       name: { $regex: new RegExp(`^${name.trim()}$`, "i") }
//     });

//     let finalAuthor = author;

//     if (!author) {
//       finalAuthor = new Author({ name: name.trim() });
//       await finalAuthor.save();
//     }

//     // Case-insensitive search for book title
//     let book = await Book.findOne({
//       title: { $regex: new RegExp(`^${title.trim()}$`, "i") }
//     });

//     if (book) {
//       for (let i = 0; i < copyCount; i++) {
//         const bookCopy = new BookCopy({
//           bookId: book._id,
//           addedOn: entryDate,
//           shelfLocation,
//           copyId: `CP_${Date.now()}_${i}`
//         });
//         await bookCopy.save();
//       }

//       book.copyCount += copyCount;
//       await book.save();

//       return res.status(200).json({
//         message: "Book exists, added new copies",
//         book,
//         success: true,
//       });
//     }

//     // Create new book
//     book = new Book({
//       title: title.trim(),
//       authors: [finalAuthor._id],
//       edition,
//       volume,
//       publisher,
//       publishedYear,
//       pages,
//       entryDate,
//       billNumber,
//       billDate,
//       vendorName,
//       costOnBill,
//       department,
//       copyCount,
//       image: req.file ? req.file.filename : ""
//     });

//     await book.save();

//     for (let i = 0; i < copyCount; i++) {
//       const bookCopy = new BookCopy({
//         bookId: book._id,
//         addedOn: entryDate,
//         shelfLocation,
//         copyId: `CP_${Date.now()}_${i}`
//       });
//       await bookCopy.save();
//     }

//     return res.status(201).json({
//       message: "New Book + Copies added",
//       book,
//       success: true,
//     });
//   } catch (err) {
//     console.error("Error in addBooks:", err);
//     return res.status(400).json({ error: err.message, success: false });
//   }
// };

const Author = require("../model/Author");
const Book = require("../model/bookSchema");
const BookCopy = require("../model/bookCopySchema");
const BookHistory = require('../model/bookHistory');

exports.addBooks = async (req, res) => {
  try {
    const {
      title,
      authors,
      edition,
      volume,
      publisher,
      yearOfPublication,
      entryDate,
      billNo,
      billDate,
      vendorName,
      costOnBill,
      pages,
      department,
      numberOfCopies,
      bookImage,
    } = req.body;

    // Validate Required Fields
    if (
      !title || 
      !authors || 
      !Array.isArray(authors) || authors.length === 0 ||
      !edition || 
      !publisher || 
      !yearOfPublication || 
      !costOnBill || 
      !numberOfCopies
    ) {
      return res.status(400).json({ message: "Required fields are missing or invalid" });
    }

    //  Check if Authors exist or create new ones
    const authorIds = [];
    for (const authorName of authors) {
      let author = await Author.findOne({ name: authorName });
      if (!author) {
        author = await Author.create({ name: authorName });
      }
      authorIds.push(author._id);
    }

  } catch (error) {
    console.error("Error in addBooks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
