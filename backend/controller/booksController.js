const Book = require("../models/Book");
const AccessionNumber = require("../models/AccessionNumber");

exports.addBook = async (req, res) => {
  try {
    const {
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
      addedBy
    } = req.body;


    const tracker = await AccessionNumber.findOne({ title, department, course });

    if (!tracker) {
      return res.status(400).json({ error: "Accession tracker not found for this title/course/department" });
    }

    if (tracker.current >= tracker.endRange) {
      return res.status(400).json({ error: "Accession number range full. Contact admin." });
    }

    
    const accessionNo = tracker.current + 1;

    
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
      addedBy,
      status: "available"
    });

    await newBook.save();

    // 5️⃣ Update tracker
    tracker.current = accessionNo;
    await tracker.save();

    res.status(201).json({
      message: "Book added successfully",
      accessionNo
    });

  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
