const Author = require("../model/Author");
const Book = require("../model/bookSchema");
const BookCopy = require("../model/bookCopySchema");

exports.addBooks = async (req, res) => {
  try {
    const {
      name,
      title,
      edition,
      volume,
      publisher,
      publishedYear,
      pages,
      entryDate,
      billNumber,
      billDate,
      vendorName,
      costOnBill,
      department,
      copyCount,
      image,
    } = req.body;

    let author = await Author.findOne({ name: name.trim() });

    if (!author) {
      author = new Author({ name });
      await author.save();
    }

    let book = await Book.findOne({ title: title.trim() })

    if (book) {
      for (let i = 0; i < copyCount; i++) {
        const bookCopy = new BookCopy({
          bookId: book._id,
          addedOn: entryDate,
        });
        await bookCopy.save();
      }

      book.copyCount += copyCount;
      await book.save()

      return res.status(200).json({
        message: "Book exists, added new copies",
        book,
        success: true,
      });
    }

    // New book
    book = new Book({
      title,
      authors: [author._id],
      edition,
      volume,
      publisher,
      publishedYear,
      pages,
      entryDate,
      billNumber,
      billDate,
      vendorName,
      costOnBill,
      department,
      copyCount,
      image,
    });

    (await book.save())

    for (let i = 0; i < copyCount; i++) {
      const bookCopy = new BookCopy({
        bookId: book._id,
        addedOn: entryDate,
      });
      (await bookCopy.save())
    }

    return res.status(201).json({
      message: "New Book + Copies added",
      book,
      success: true,
    });
  } catch (err) {
    console.error("Error in addBooks:", err);
    return res.status(400).json({ error: err.message, success: false });
  }
};
