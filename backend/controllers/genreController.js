import genreL1 from "../models/genrel1Model.js";
import genreL2 from "../models/genrel2Model.js";
import genreL3 from "../models/genrel3Model.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create L1 Genre
export const createGenreL1 = catchAsyncErrors(async (req, res, next) => {
    const newGenre = new genreL1 ({
        name:req.params.l1
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
});

// Create L2 Genre
export const createGenreL2 = catchAsyncErrors(async (req, res, next) => {
    const newGenre = new genreL2 ({
        name:req.params.l2, 
        level1:req.params.l1
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
 });

// Create L3 Genre
export const createGenreL3 = catchAsyncErrors(async (req, res, next) => {
    const newGenre = new genreL3 ({
        name:req.params.l3, 
        level1:req.params.l2
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
 });

// Get All Genres
export const getAllGenres = catchAsyncErrors(async (req, res, next) => {
    const genresl1 = await genreL1.find();
    const genresl2 = await genreL2.find();
    const genresl3 = await genreL3.find();
    const genres = [...genresl1, ...genresl2, ...genresl3];
    res.status(201).send(genres);
});

// Get L1 Genre by ID
export const getGenreL1 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL1.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    res.status(201).send(genre_value);
});

// Get L2 Genre by ID
export const getGenreL2 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL2.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    res.status(201).send(genre_value);
});

// Get L3 Genre by ID
export const getGenreL3 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL3.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    res.status(201).send(genre_value);
});

// Delete L1 Genre by ID
export const deleteGenreL1 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL1.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }

    await genres.remove();

    res.status(200).json({
        success:true,
        message:"L1 Genre deleted successfully."
    })
});

// Delete L2 Genre by ID
export const deleteGenreL2 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL2.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }

    await genres.remove();

    res.status(200).json({
        success:true,
        message:"L1 Genre deleted successfully."
    })
});

// Delete L3 Genre by ID
export const deleteGenreL3 = catchAsyncErrors(async (req, res, next) => {
    const genre = await genreL3.find();
    const genre_value = await genre.findById(req.params.id);
    if(!genre_value) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }

    await genres.remove();

    res.status(200).json({
        success:true,
        message:"L1 Genre deleted successfully."
    })
});