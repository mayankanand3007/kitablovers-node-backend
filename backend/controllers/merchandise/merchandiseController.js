import merchandise from "../../models/merchandise/merchandiseModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Book Condition
export const createMerchandise = catchAsyncErrors(async (req, res, next) => {
    const newMerchandise = await merchandise.create(req.body);
    res.status(201).json({
        success:true,
        newMerchandise
    });
});

// Get All Book Conditions
export const getAllMerchandises = catchAsyncErrors(async (req, res, next) => {
    const merchandises = await merchandise.find();
    res.status(201).send(merchandises);
});

// Get Book Condition by ID
export const getMerchandise = catchAsyncErrors(async (req, res, next) => {
    const merchandises = await merchandise.findById(req.params.id);

    if(!merchandises){
        return next(new ErrorHandler("Merchandise not found.", 404));
    }

    res.status(200).json({
        success:true,
        merchandises
    });
});

// Update Book Condition by ID
export const updateMerchandise = catchAsyncErrors(async (req, res, next) => {
    let merchandises = merchandise.findById(req.params.id);

    if(!merchandises) {
        return next(new ErrorHandler("Merchandise not found.", 404));
    }

    merchandises = await merchandise.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        merchandises
    });
    
 });

// Delete Book Condition by ID
export const deleteMerchandise = catchAsyncErrors(async (req, res, next) => {
    const merchandises = await merchandise.findById(req.params.id);

    if(!merchandises){
        return res.status(500).json({
            success:false,
            message:"Merchandise not found."
        });
    }

    await merchandises.remove();
    
    res.status(200).json({
        success:true,
        message:"Merchandise deleted successfully."
    });
});