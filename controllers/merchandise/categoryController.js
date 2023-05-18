import merchandiseCategory from "../../models/merchandise/categoryModel.js";
import merchandise from "../../models/merchandise/merchandiseModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Merchandise Category Model
export const createMerchandiseCategory = catchAsyncErrors(async (req, res, next) => {
        const newCategory = new merchandiseCategory ({
            ...req.body,
        });
        await newCategory.save();
        res.status(201).send("Merchandise Category has been added.");
});

// Get All Merchandise Categories
export const getAllMerchandiseCategories = catchAsyncErrors(async (req, res, next) => {
    const merchandiseCategories = await merchandiseCategory.find();
    let merchCategories_resp = [];
    for (let merchCategory in merchandiseCategories) {
        merchCategories_resp.push(
            {
                id: merchandiseCategories[merchCategory]._id,
                name: merchandiseCategories[merchCategory].name,
            });
    }
    res.status(200).json(merchCategories_resp);
});


// Get Merchandise Category by ID
export const getMerchandiseCategory = catchAsyncErrors(async (req, res, next) => {
    const merchandiseCategories = await merchandiseCategory.findById(req.params.id);

    if(!merchandiseCategories){
        return next(new ErrorHandler("Merchandise Category not found.", 404));
    }

    res.status(200).json({
        success:true,
        merchandiseCategories
    });
});


// Update Merchandise Category by ID
export const updateMerchandiseCategory = catchAsyncErrors(async (req, res, next) => {
    let merchandiseCategories = merchandiseCategory.findById(req.params.id);

    if(!merchandiseCategories) {
        return next(new ErrorHandler("Merchandise Category not found.", 404));
    }

    merchandiseCategories = await merchandiseCategory.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        merchandiseCategories
    });
    
 });

// Delete Merchandise Category by ID
export const deleteMerchandiseCategory = catchAsyncErrors(async (req, res, next) => {
    const merchandiseCategories = await merchandiseCategory.findById(req.params.id);

    if(!merchandiseCategories) {
        return next(new ErrorHandler("Merchandise Category ID not found.", 404));
    }
    
    let merchandises = await merchandise.find({"category":req.params.id});

    await merchandiseCategories.remove();
    
    res.status(200).json({
        success:true,
        message:"Merchandise Category deleted successfully."
    })
});