import Book from "../models/bookModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    res.status(201).send(books);
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