import surpriseBox from "../../models/surpriseBox/surpriseBoxModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Book Condition
export const createSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    const newSurpriseBox = await surpriseBox.create(req.body);
    res.status(201).json({
        success:true,
        newSurpriseBox
    });
});

// Get All Book Conditions
export const getAllSurpriseBoxes = catchAsyncErrors(async (req, res, next) => {
    const surpriseBoxes = await surpriseBox.find();
    res.status(201).send(surpriseBoxes);
});

// Get Book Condition by ID
export const getSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    const surpriseBoxes = await surpriseBox.findById(req.params.id);

    if(!surpriseBoxes){
        return next(new ErrorHandler("Surprise Box not found.", 404));
    }

    res.status(200).json({
        success:true,
        surpriseBoxes
    });
});

// Update Book Condition by ID
export const updateSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    let surpriseBoxes = surpriseBox.findById(req.params.id);

    if(!surpriseBoxes) {
        return next(new ErrorHandler("Surprise Box not found.", 404));
    }

    surpriseBoxes = await surpriseBox.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        surpriseBoxes
    });
    
 });

// Delete Book Condition by ID
export const deleteSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    const surpriseBoxes = await surpriseBox.findById(req.params.id);

    if(!surpriseBoxes){
        return res.status(500).json({
            success:false,
            message:"Surprise Box not found."
        });
    }

    await surpriseBoxes.remove();
    
    res.status(200).json({
        success:true,
        message:"Surprise Box deleted successfully."
    });
});