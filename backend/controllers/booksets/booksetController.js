import bookset from "../../models/booksets/booksetModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Book Condition
export const createBookset = catchAsyncErrors(async (req, res, next) => {
    const newBookset = await bookset.create(req.body);
    res.status(201).json({
        success:true,
        newBookset
    });
});

// Get All Book Conditions
export const getAllBooksets = catchAsyncErrors(async (req, res, next) => {
    const booksets = await bookset.find();
    res.status(201).send(booksets);
});

// Get Book Condition by ID
export const getBookset = catchAsyncErrors(async (req, res, next) => {
    const booksets = await bookset.findById(req.params.id);

    if(!booksets){
        return next(new ErrorHandler("Bookset not found.", 404));
    }

    res.status(200).json({
        success:true,
        booksets
    });
});

// Update Book Condition by ID
export const updateBookset = catchAsyncErrors(async (req, res, next) => {
    let booksets = bookset.findById(req.params.id);

    if(!booksets) {
        return next(new ErrorHandler("Bookset not found.", 404));
    }

    booksets = await bookset.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        booksets
    });
    
 });

// Delete Book Condition by ID
export const deleteBookset = catchAsyncErrors(async (req, res, next) => {
    const booksets = await bookset.findById(req.params.id);

    if(!booksets){
        return res.status(500).json({
            success:false,
            message:"Bookset not found."
        });
    }

    await booksets.remove();

    res.status(200).json({
        success:true,
        message:"Bookset deleted successfully."
    });
});