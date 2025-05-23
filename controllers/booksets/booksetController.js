import bookset from "../../models/booksets/booksetModel.js";
import tagmodel from "../../models/books/tagModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Bookset
export const createBookset = catchAsyncErrors(async (req, res, next) => {
    let bookset_val = {...req.body};
    bookset_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");
    await bookset.create(bookset_val);
    bookset_val.thumbnail = Buffer.from(req.body.thumbnail).toString("base64");
    res.status(201).json({
        success:true,
        bookset_val
    });
});

// Get All Booksets
export const getAllBooksets = catchAsyncErrors(async (req, res, next) => {
    const booksets = await bookset.find();
    let booksets_val = [];
    for (let bookset in booksets) {
        let tag_val = [];
        let tag_data = booksets[bookset].tags;
        if (tag_data.length != 0) {
            for( let tag in tag_data) {
                let tag_val_data = await tagmodel.findById(tag_data[tag]);
                tag_val.push(
                    tag_val_data
                )
            }
        }
        booksets_val.push(
            {
                id: booksets[bookset].id,
                title: booksets[bookset].title,
                thumbnail: Buffer.from(booksets[bookset].thumbnail).toString("base64"),
                description: booksets[bookset].description,
                mrp: booksets[bookset].mrp,
                tags: tag_val,
                book_count: booksets[bookset].book_count,
                pricing: booksets[bookset].pricing,
                inventory: booksets[bookset].inventory,
                reviews: booksets[bookset].reviews
            }
        );
    }
    res.status(201).send(booksets_val);
});

// Get Bookset by ID
export const getBookset = catchAsyncErrors(async (req, res, next) => {
    let booksets = await bookset.findById(req.params.id);

    if(!booksets){
        return next(new ErrorHandler("Bookset not found.", 404));
    }

    let tag_val = [];
    let tag_data = booksets.tags;
    if (tag_data.length != 0) {
        for( let tag in tag_data) {
            let tag_val_data = await tagmodel.findById(tag_data[tag]);
            tag_val.push(
                tag_val_data
            )
        }
    }
    let bookset_val = {
        id: booksets.id,
        title: booksets.title,
        thumbnail: Buffer.from(booksets.thumbnail).toString("base64"),
        description: booksets.description,
        mrp: booksets.mrp,
        tags: tag_val,
        book_count: booksets.book_count,
        pricing: booksets.pricing,
        inventory: booksets.inventory,
        reviews: booksets.reviews
    }

    res.status(200).json({
        success:true,
        bookset_val
    });
});

// Update Bookset by ID
export const updateBookset = catchAsyncErrors(async (req, res, next) => {
    let booksets = bookset.findById(req.params.id);

    if(!booksets) {
        return next(new ErrorHandler("Bookset not found.", 404));
    }

    let bookset_fetch_val = {...req.body};
    bookset_fetch_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");

    booksets = await bookset.findByIdAndUpdate(req.params.id,bookset_fetch_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });
    
    let bookset_val = {
        id: booksets.id,
        title: booksets.title,
        thumbnail: Buffer.from(booksets.thumbnail).toString("base64"),
        description: booksets.description,
        mrp: booksets.mrp,
        tags: booksets.tags,
        book_count: booksets.book_count,
        pricing: booksets.pricing,
        inventory: booksets.inventory,
        reviews: booksets.reviews
    }

    res.status(200).json({
        success:true,
        bookset_val
    });
    
 });

// Delete Bookset by ID
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