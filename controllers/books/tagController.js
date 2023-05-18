import tag from "../../models/books/tagModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

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
    let bookTag_resp = [];
    for (let tag in tags) {
        bookTag_resp.push(
            {
                id: tags[tag]._id,
                name: tags[tag].name,
            });
    }
    res.status(200).json({
        success:true,
        bookTag_resp
    });
});


// Get Tag by ID
export const getTag = catchAsyncErrors(async (req, res, next) => {
    const tags = await tag.findById(req.params.id);

    if(!tags){
        return next(new ErrorHandler("Tag not found.", 404));
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
        return next(new ErrorHandler("Tag not found.", 404));
    }

    tags = await tag.findByIdAndUpdate(req.params.id,req.body,{
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

    if(!tags) {
        return next(new ErrorHandler("Tag ID not found.", 404));
    }
    
    await tags.remove();
    
    res.status(200).json({
        success:true,
        message:"Tag deleted successfully."
    })
});