const AccessionTracker = require("../models/accessionTrackerSchema");
const Book = require("../models/bookSchema");

const addBook = async (req, res) => {
  try {
    const {
      title,
      department,
      startRangeFromFrontend, // only required if tracker not exists

      author,
      edition,
      publisher,
      yearOfPublication,
      course,
      cost,
      pages,
      isbn,

      vendorName,
      billNo,
      billDate,
      entryDate,

      rackNo,
      shelfNo,
    
      addedBy
    } = req.body;

    let tracker = await AccessionTracker.findOne({ department, title });

    let accessionNo;

    if (!tracker) {
      if (!startRangeFromFrontend) {
        return res.status(400).json({
          error: "Tracker not found for this department and title. Please provide startRangeFromFrontend."
        });
      }

      accessionNo = startRangeFromFrontend;

      tracker = await AccessionTracker.create({
        department,
        title,
        startRange: accessionNo,
        current: accessionNo
      });
    } else {
      accessionNo = tracker.current + 1;
      tracker.current = accessionNo;
      await tracker.save();
    }

    const newBook = new Book({
      accessionNo,
      title,
      author,
      edition,
      publisher,
      yearOfPublication,

      department,
      course,

      cost,
      pages,
      isbn,

      vendorName,
      billNo,
      billDate,
      entryDate,

      rackNo,
      shelfNo,
     
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      accessionNo
    });

  } catch (err) {
    console.error("Add book error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addBook };
