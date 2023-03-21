import tag from "../models/tagModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create Tag Model
export const createTag = catchAsyncErrors(async (req, res, next) => {
        const newTag = new tag ({
            ...req.body,
        });
        await newTag.save();
        res.status(201).send("Tag has been added.");
});

// Get All Tags
export const getAllTags = catchAsyncErrors(async (req, res, next) => {
    const tags = await tag.find();
    res.status(200).json({
        success:true,
        tags
    });
});


// Get Tag by ID
export const getTag = catchAsyncErrors(async (req, res, next) => {
    const tags = await tag.findById(req.params.id);

    if(!tags){
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    res.status(200).json({
        success:true,
        tags
    });
});


// Update Tag by ID
export const updateTag = catchAsyncErrors(async (req, res, next) => {
    let tags = tag.findById(req.params.id);

    if(!tags) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    tags = await tag.findByIdAndUpdate(req.params.id,req.params.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        tags
    });
    
 });

// Delete Tag by ID
export const deleteTag = catchAsyncErrors(async (req, res, next) => {
    const tags = await tag.findById(req.params.id);

    if(!tags){
        return res.status(500).json({
            success:false,
            message:"Tag not found."
        })
    }

    await tags.remove();

    res.status(200).json({
        success:true,
        message:"Tag deleted successfully."
    })
});