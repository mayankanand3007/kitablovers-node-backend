import merchandise from "../../models/merchandise/merchandiseModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Merchandise
export const createMerchandise = catchAsyncErrors(async (req, res, next) => {
    let merch_val = {...req.body};
    merch_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");
    await merchandise.create(merch_val);
    merch_val.thumbnail = Buffer.from(req.body.thumbnail).toString("base64");
    res.status(201).json({
        success:true,
        merch_val
    });
});

// Get All Merchandises
export const getAllMerchandises = catchAsyncErrors(async (req, res, next) => {
    const merchs = await merchandise.find();
    let merch_val = []
    for (let merch in merchs) {
        merch_val.push(
            {
                id: merchs[merch].id,
                title: merchs[merch].title,
                thumbnail: Buffer.from(merchs[merch].thumbnail).toString("base64"),
                category: merchs[merch].category,
                mrp: merchs[merch].mrp,
                price: merchs[merch].price,
                quantity: merchs[merch].quantity,
                location: merchs[merch].location
            }
        )
    }
    res.status(201).send(merch_val);
});

// Get Merchandise by ID
export const getMerchandise = catchAsyncErrors(async (req, res, next) => {
    const merchandises = await merchandise.findById(req.params.id);

    if(!merchandises){
        return next(new ErrorHandler("Merchandise not found.", 404));
    }

    merch_val = {
        id: merchandises.id,
        title: merchandises.title,
        thumbnail: Buffer.from(merchandises.thumbnail).toString("base64"),
        description: merchandises.description,
        mrp: merchandises.mrp,
        tags: merchandises.tags,
        book_count: merchandises.book_count,
        pricing: merchandises.pricing,
        inventory: merchandises.inventory,
        reviews: merchandises.reviews
    }

    res.status(200).json({
        success:true,
        merch_val
    });
});

// Update Merchandise by ID
export const updateMerchandise = catchAsyncErrors(async (req, res, next) => {
    let merchandises = merchandise.findById(req.params.id);

    if(!merchandises) {
        return next(new ErrorHandler("Merchandise not found.", 404));
    }

    merch_val = {
        title: merchandises.title,
        thumbnail: Buffer.from(merchandises.thumbnail, "base64"),
        description: merchandises.description,
        mrp: merchandises.mrp,
        tags: merchandises.tags,
        book_count: merchandises.book_count,
        pricing: merchandises.pricing,
        inventory: merchandises.inventory,
        reviews: merchandises.reviews
    }

    merchandises = await merchandise.findByIdAndUpdate(req.params.id,merch_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        merch_val
    });
    
 });

// Delete Merchandise by ID
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