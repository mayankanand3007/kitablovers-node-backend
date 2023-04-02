import Book from "../models/bookModel.js";
import booksInventory from "../models/booksInventoryModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import fs from "fs";

// Create Books Inventory
export const createBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const response = await createBooksISBN(req.body.isbn);
    if(!response){
        return next(new ErrorHandler("Book ISBN not found.", 404));
    }
    const newBooksInventory = new booksInventory ({
        ...req.body,
    });
    await newBooksInventory.save();
    res.status(200).json({
        success:true,
        newBooksInventory
    });
});

async function createBooksISBN (isbn) {
    // const url = "https://www.googleapis.com/books/v1/volumes?q=isbn=" + newBooksInventory["isbn"];
    // request(url, library = (err, res, body) => {
    //     // pass
    // });
    // Check if ISBN is already present in DB.
    const check_isbn = await Book.findOne({isbn:isbn});
    if (!check_isbn) {
        let data = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)).json();
        // Check if ISBN is available in Google Books API.
        if (data.totalItems === 0) {
            return false;
        }
        else {
            const book = data.items[0].volumeInfo;
            // Check if All Book Attributes are there.
            if (book.title && book.subtitle && book.authors && book.imageLinks.thumbnail && book.publisher && book.publishedDate && book.language && book.pageCount) {
                let thumbnail_bson = "";
                let fig = await fetch(book.imageLinks.thumbnail);
                thumbnail_bson = Buffer.from(await fig.arrayBuffer());
                const newBook = new Book({
                    isbn: isbn,
                    genre: [0],
                    title: book.title,
                    subtitle: book.subtitle,
                    author: book.authors,
                    thumbnail: fs.readFileSync(thumbnail_bson),
                    description: book.description,
                    publisher: book.publisher,
                    publishedOn: book.publishedDate,
                    language: book.language,
                    pageCount: book.pageCount
                });
                newBook.save();
            }
            else {
                let book_copy = book;
                if (!book.title) {
                    book_copy.title = " ";
                }
                if (!book.subtitle) {
                    book_copy.subtitle = " ";
                }
                if (!book.authors) {
                    book_copy.authors = " ";
                }
                let thumbnail_bson = "";
                if (!book.imageLinks.thumbnail) {
                    thumbnail_bson = " ";
                }
                else {
                    let fig = await fetch(book.imageLinks.thumbnail);
                    thumbnail_bson = Buffer.from(await fig.arrayBuffer());
                }
                if (!book.publisher) {
                    book_copy.publisher = " ";
                }
                if (!book.publishedDate) {
                    book_copy.publishedDate = " ";
                }
                if (!book.language) {
                    book_copy.language = " ";
                }
                if (!book.pageCount) {
                    book_copy.pageCount = " ";
                }
                const newBook = new Book({
                    isbn: isbn,
                    genre: [0],
                    title: book_copy.title,
                    subtitle: book_copy.subtitle,
                    author: book_copy.authors,
                    thumbnail: thumbnail_bson,
                    description: book_copy.description,
                    publisher: book_copy.publisher,
                    publishedOn: book_copy.publishedDate,
                    language: book_copy.language,
                    pageCount: book_copy.pageCount
                });
                newBook.save();
            }
        }
    }
    return true;
}

// Get All Books Inventories
export const getAllBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.find();
    res.status(200).json({
        success:true,
        books_inventories
    });
});

// Get Books Inventory by ID
export const getBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories){
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    res.status(200).json({
        success:true,
        books_inventories
    });
});

// Update Books Inventory by ID
export const updateBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    books_inventories = await booksInventory.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        books_inventories
    });

 });

// Delete Books Inventory by ID
export const deleteBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories){
        return res.status(500).json({
            success:false,
            message:"Inventory Record not found."
        })
    }

    await books_inventories.remove();

    res.status(200).json({
        success:true,
        message:"Books Inventory deleted successfully."
    })
});