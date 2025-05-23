import merchandise from "../../models/merchandise/merchandiseModel.js";
import tagmodel from "../../models/books/tagModel.js";
import categorymodel from "../../models/merchandise/categoryModel.js"
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
        let tag_val = [];
        let tag_data = merchs[merch].tags;
        if (tag_data.length != 0) {
            for( let tag in tag_data) {
                let tag_val_data = await tagmodel.findById(tag_data[tag]);
                tag_val.push(
                    tag_val_data
                )
            }
        }
        let category_val = [];
        let category_data = merchs[merch].category;
        if (category_data.length != 0) {
            for( let category in category_data) {
                let category_val_data = await categorymodel.findById(category_data[category]);
                category_val.push(
                    category_val_data
                )
            }
        }
        merch_val.push(
            {
                id: merchs[merch].id,
                title: merchs[merch].title,
                tags: tag_val,
                thumbnail: Buffer.from(merchs[merch].thumbnail).toString("base64"),
                category: category_val,
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

    let tag_val = [];
    let tag_data = merchandises.tags;
    if (tag_data.length != 0) {
        for( let tag in tag_data) {
            let tag_val_data = await tagmodel.findById(tag_data[tag]);
            tag_val.push(
                tag_val_data
            )
        }
    }

    let category_val = [];
    let category_data = merchandises.category;
    if (category_data.length != 0) {
        for( let category in category_data) {
            let category_val_data = await categorymodel.findById(category_data[category]);
            category_val.push(
                category_val_data
            )
        }
    }

    let merch_val = {
        id: merchandises.id,
        title: merchandises.title,
        category: category_val,
        thumbnail: Buffer.from(merchandises.thumbnail).toString("base64"),
        description: merchandises.description,
        mrp: merchandises.mrp,
        price: merchandises.price,
        location: merchandises.location,
        quantity: merchandises.quantity,
        tags: tag_val,
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
    console.log(merchandises);

    if(!merchandises) {
        return next(new ErrorHandler("Merchandise not found.", 404));
    }

    let merch_val = {...req.body};
    merch_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");
    
    merchandises = await merchandise.findByIdAndUpdate(req.params.id, merch_val, {
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    let resp = {
        title: merchandises.title,
        thumbnail: Buffer.from(merchandises.thumbnail).toString("base64"),
        description: merchandises.description,
        category: merchandises.category,
        mrp: merchandises.mrp,
        tags: merchandises.tags,
        book_count: merchandises.book_count,
        pricing: merchandises.pricing,
        price: merchandises.price,
        location: merchandises.location,
        quantity: merchandises.quantity,
        inventory: merchandises.inventory,
        reviews: merchandises.reviews
    }

    res.status(201).json({
        success:true,
        resp
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