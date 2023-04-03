import Book from "../../models/books/bookModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";
import fs from "fs";

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    let book_resp = [];
    for (let book in books) {
        book_resp.push(
            {
                _id: books[book]._id, 
                isbn: books[book].isbn, 
                genre: books[book].genre, 
                title: books[book].title, 
                thumbnail: Buffer.from(books[book].thumbnail).toString("base64"),
                subtitle: books[book].subtitle, 
                author: books[book].author, 
                publisher: books[book].publisher,
                publishedOn: books[book].publishedOn, 
                language: books[book].language, 
                pageCount: books[book].pageCount, 
                iamges: books[book].images, 
                tags: books[book].tags
            });
    }
    res.status(201).send(book_resp);
});

// Update Book by ID
export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let books = Book.findById(req.params.id);

    if(!books) {
        return next(new ErrorHandler("Book Condition not found.", 404));
    }

    books = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        books
    });
    
 });