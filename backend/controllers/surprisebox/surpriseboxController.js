import surpriseBox from "../../models/surpriseBox/surpriseBoxModel.js";
import tagmodel from "../../models/books/tagModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Surprise Box
export const createSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    let surprise_val = {...req.body};
    surprise_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");
    await surpriseBox.create(surprise_val);
    surprise_val.thumbnail = Buffer.from(req.body.thumbnail).toString("base64");
    res.status(201).json({
        success:true,
        surprise_val
    });
});

// Get All Surprise Boxes
export const getAllSurpriseBoxes = catchAsyncErrors(async (req, res, next) => {
    const surpriseBoxes = await surpriseBox.find();
    let surprise_val = []
    for (let surprise_box in surpriseBoxes) {
        let surprise_box_val = [];
        let surprise_box_data = surpriseBoxes[surprise_box].tags;
        if (surprise_box_data.length != 0) {
            for( let surprise_box in surprise_box_data) {
                let surprise_box_val = await tagmodel.findById(surpriseBoxes[surprise_box]);
                surprise_box_val.push(
                    surprise_box_data
                )
            }
        }
        surprise_val.push(
            {
                id: surpriseBoxes[surprise_box].id,
                title: surpriseBoxes[surprise_box].title,
                thumbnail: Buffer.from(surpriseBoxes[surprise_box].thumbnail).toString("base64"),
                pricing: surpriseBoxes[surprise_box].pricing,
                tags: surprise_box_val
            }
        );
    }
    res.status(201).send(surprise_val);
});

// Get Surprise Box by ID
export const getSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    const surpriseBoxes = await surpriseBox.findById(req.params.id);

    if(!surpriseBoxes){
        return next(new ErrorHandler("Surprise Box not found.", 404));
    }

    const resp = {
        id: surpriseBoxes.id,
        title: surpriseBoxes.title,
        thumbnail: Buffer.from(surpriseBoxes.thumbnail).toString("base64"),
        description: surpriseBoxes.description,
        pricing: surpriseBoxes.pricing,
        tags: surpriseBoxes.tags,
        reviews: surpriseBoxes.reviews
    }

    res.status(200).json({
        success:true,
        resp
    });
});

// Update Surprise Box by ID
export const updateSurpriseBox = catchAsyncErrors(async (req, res, next) => {
    let surpriseBoxes = surpriseBox.findById(req.params.id);

    if(!surpriseBoxes) {
        return next(new ErrorHandler("Surprise Box not found.", 404));
    }

    let surprise_val = {...req.body};
    surprise_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");

    surpriseBoxes = await surpriseBox.findByIdAndUpdate(req.params.id,surprise_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    let surprise_box_val = [];
    let surprise_box_data = surpriseBoxes.tags;
    if (surprise_box_data.length != 0) {
        for( let surprise_box in surprise_box_data) {
            let surprise_box_val = await tagmodel.findById(surpriseBoxes[surprise_box]);
            surprise_box_val.push(
                surprise_box_data
            )
        }
    }
    let surpise_val = {
        id: surpriseBoxes.id,
        title: surpriseBoxes.title,
        thumbnail: Buffer.from(surpriseBoxes.thumbnail).toString("base64"),
        description: surpriseBoxes.description,
        tags: surprise_box_val,
        pricing: surpriseBoxes.pricing,
        reviews: surpriseBoxes.reviews
    }

    
    res.status(200).json({
        success:true,
        surpise_val
    });
    
 });

// Delete Surprise Box by ID
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