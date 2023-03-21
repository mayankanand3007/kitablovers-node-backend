import genre from "../models/genreModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create L1 Genre
export const createGenreL1 = catchAsyncErrors(async (req, res, next) => {
    const newGenre = new genre ({
        genre: {name:req.params.l1, level2:{name: "", level3:{name:""}}}
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
});

// // Add L2 Genre
export const createGenreL2 = catchAsyncErrors(async (req, res, next) => {
    const genre_value = await genre.findOne({name: req.params.l1});
    console.log(genre_value._id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre not found.", 404));
    }
    // console.log({_id:genre_value.id}, {$push: { $addToSet: {level2: req.params.l2}}});
    // genre_value.update({_id:genre_value.id}, {$push: { $addToSet: {level2: req.params.l2}}});
    // new_genre_value = await genre_value.updateOne({name:req.params.l1},{$addToSet: {level2:req.params.l2}});
    // genre_value = await genre.findByIdAndUpdate(req.params.l1,new_genre_value,{
    //     new:true,
    //     runValidators:true,
    //     useFindandModify:false
    // });

    res.status(200).json({
        success:true,
        genre_value
    });
    
 });



// Get All Genres
export const getAllGenres = catchAsyncErrors(async (req, res, next) => {
    const genres = await genre.find();
    res.status(201).send(genres);
});

// Delete Genre by ID
export const deleteGenre = catchAsyncErrors(async (req, res, next) => {
    const genre_value = await genre.findById(req.params.id);

    if(!genre_value){
        return res.status(500).json({
            success:false,
            message:"Genre not found."
        })
    }

    await genre_value.remove();

    res.status(200).json({
        success:true,
        message:"Genre deleted successfully."
    })
});