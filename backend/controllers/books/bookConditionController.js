import bookCondition from "../../models/books/bookConditionModel.js";
import booksInventory from "../../models/books/booksInventoryModel.js"
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Book Condition
export const createBookCondition = catchAsyncErrors(async (req, res, next) => {
    const newBookCondition = await bookCondition.create(req.body);
    res.status(201).json({
        success:true,
        newBookCondition
    });
});

// Get All Book Conditions
export const getAllBookConditions = catchAsyncErrors(async (req, res, next) => {
    const books_conditions = await bookCondition.find();
    let bookCond_resp = [];
    for (let bookCond in books_conditions) {
        bookCond_resp.push(
            {
                id: books_conditions[bookCond].id,
                name: books_conditions[bookCond].name
            });
    }
    res.status(201).send(bookCond_resp);
});


// Get Book Condition by ID
export const getBookCondition = catchAsyncErrors(async (req, res, next) => {
    const book_conditions = await bookCondition.findById(req.params.id);

    if(!book_conditions){
        return next(new ErrorHandler("Book Condition not found.", 404));
    }

    res.status(200).json({
        success:true,
        book_conditions
    });
});


// Update Book Condition by ID
export const updateBookCondition = catchAsyncErrors(async (req, res, next) => {
    let book_conditions = bookCondition.findById(req.params.id);

    if(!book_conditions) {
        return next(new ErrorHandler("Book Condition not found.", 404));
    }

    book_conditions = await bookCondition.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        book_conditions
    });
    
 });

// Delete Book Condition by ID
export const deleteBookCondition = catchAsyncErrors(async (req, res, next) => {
    const book_conditions = await bookCondition.findById(req.params.id);

    if(!book_conditions){
        return res.status(500).json({
            success:false,
            message:"Book Condition not found."
        })
    }

    const books_inventory = await booksInventory.find();

    
    await book_conditions.remove();
    
    res.status(200).json({
        success:true,
        message:"Book Condition deleted successfully."
    })
});