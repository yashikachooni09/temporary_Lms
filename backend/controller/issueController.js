const Issued = require("../model/issueSchema");
const BookCopie = require("../model/bookCopy"); // 👈 correct model name based on "bookCopie"
const User = require("../model/User");

exports.issueBook = async (req, res) => {
  try {
    const { accessionNumber, rollNumber } = req.body;

    if (!accessionNumber || !rollNumber) {
      return res.status(400).json({ message: "Accession number and roll number are required." });
    }

    const bookCopy = await BookCopie.findOne({ accessionNumber }).populate("book");
    if (!bookCopy) {
      return res.status(404).json({ message: "Book copy not found." });
    }

    if (bookCopy.status === "issued") {
      return res.status(400).json({ message: "This book is already issued." });
    }

    const student = await User.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student with this roll number not found." });
    }

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + 14);

    const issued = await Issued.create({
      book: bookCopy.book._id,
      bookCopy: bookCopy._id,
      user: student._id,
      issueDate,
      dueDate,
      status: "issued",
      fine: 0
    });

    bookCopy.status = "issued";
    await bookCopy.save();

    res.status(201).json({
      message: "Book issued successfully.",
      title: bookCopy.book.title,
      accessionNumber: bookCopy.accessionNumber,
      studentName: student.userName,
      course: student.course,
      rollNumber: student.rollNumber,
      dueDate
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
