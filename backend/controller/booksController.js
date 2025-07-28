// controllers/bookController.js

const Book = require("../model/bookSchema");
const BookCopie = require("../model/bookCopy");
const AccessionTracker = require("../model/accessionSchema");

exports.addBooks = async (req, res) => {
  try {
    const {
      entryDate, bookName, title, author, edition, volume,
      publisher, year, pages, isbn,
      department, course, cost,
      rackNumber, shelfNo, place,
      vendor, billNo, billDate,
      noOfBooks
    } = req.body;

    // 🔍 Step 1: Try to find existing book
    let book = await Book.findOne({
      title: title.trim(),
      author: author.trim(),
      edition: edition.trim(),
      publisher: publisher.trim()
    });

    let isNewBook = false;

    if (!book) {
      // ✅ New Book - Create it
      isNewBook = true;
      book = new Book({
        entryDate, bookName, title, author, edition, volume,
        publisher, year, pages, isbn,
        department, course, cost,
        rackNumber, shelfNo, place,
        vendor, billNo, billDate,
        noOfBooks
      });
    } else {
      // ✅ Existing Book - Just update number of copies
      book.noOfBooks += parseInt(noOfBooks);
    }

    const savedBook = await book.save();

    // ✅ Step 2: Accession Tracker
    let tracker = await AccessionTracker.findOne({ course });

    if (!tracker) {
      tracker = new AccessionTracker({
        course,
        startRange: 1000,
        current: 999
      });
    }

    // ✅ Step 3: Save Copies
    const copyPromises = [];

    for (let i = 0; i < noOfBooks; i++) {
      tracker.current += 1;

      const copy = new BookCopie({
        book: savedBook._id,
        accessionNumber: tracker.current,
        rackNumber,
        shelfNo
      });

      copyPromises.push(copy.save());
    }

    await Promise.all(copyPromises);
    await tracker.save();

    // ✅ Response
    res.status(201).json({
      message: `${noOfBooks} copies ${isNewBook ? "added" : "updated"} successfully`,
      bookId: savedBook._id,
      fromAccession: tracker.current - noOfBooks + 1,
      toAccession: tracker.current
    });

  } catch (err) {
    console.error("Add Book Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
