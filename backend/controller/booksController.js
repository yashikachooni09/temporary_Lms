const Book = require("../model/bookSchema");
const BookCopie  = require("../model/bookCopy"); // Agar copies bhi create kar rahi hai
const AccessionTracker = require("../model/accessionSchema"); // Accessions ke liye



exports.addBooks = async (req, res) => {
  try {
    const {
      title, author, edition, publisher,
      yearOfPublication, pages, isbn,
      department, course, cost,
      rackNo, shelfNo, copies
    } = req.body;

    // Step 1: Save book
    const book = new Book({
      title, author, edition, publisher,
      yearOfPublication, pages, isbn,
      department, course, cost
    });

    const savedBook = await book.save();

    // Step 2: Get/Create accession tracker
    let tracker = await AccessionTracker.findOne({ course });

    if (!tracker) {
      tracker = new AccessionTracker({
        course,
        startRange: 1000,
        current: 999, // So that ++ starts from 1000
      });
    }

    // Step 3: Create multiple copies
    const newCopies = [];

    for (let i = 0; i < copies; i++) {
      tracker.current += 1;

      const copy = new BookCopie({
        book: savedBook._id,
        accessionNumber: tracker.current,
        rackNo,
        shelfNo
      });

      newCopies.push(copy.save());
    }

    await Promise.all(newCopies);
    await tracker.save();

    res.status(201).json({
      message: `${copies} Copies Added Successfully`,
      bookId: savedBook._id,
      fromAccession: tracker.current - copies + 1,
      toAccession: tracker.current
    });

  } catch (err) {
    console.error("Add Book Error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};
