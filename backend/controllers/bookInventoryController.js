import Book from "../models/bookModel.js";
import booksInventory from "../models/booksInventoryModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create Books Inventory
export const createBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const newBooksInventory = new booksInventory ({
        ...req.body,
    });
    const response = await createBooksISBN(newBooksInventory.isbn);
    if(!response){
        return next(new ErrorHandler("Book ISBN not found.", 404));
    }
    // const url = "https://www.googleapis.com/books/v1/volumes?q=isbn=" + newBooksInventory["isbn"];
    // request(url, library = (err, res, body) => {
    //     // pass
    // });
    await newBooksInventory.save();
    res.status(200).json({
        success:true,
        newBooksInventory
    });
});

async function createBooksISBN (isbn) {
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
    .then(res => res.json())
    .then(data => {
        if (data.totalItems == 0) {
            return false;
        }
        else {
            const book = data.items[0];
            const genres = book.volumeInfo.categories;
            const newBook = new Book({
                genre: {},
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                author: book.volumeInfo.authors,
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                description: book.volumeInfo.description,
                publisher: book.volumeInfo.publisher,
                publishedDate: book.volumeInfo.publishedDate,
                language: book.volumeInfo.language,
                pageCount: book.volumeInfo.pageCount
            });
            newBook.save();
            return true;
        }`  `
    });
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

    books_inventories = await booksInventory.findByIdAndUpdate(req.params.id,req.params.body,{
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