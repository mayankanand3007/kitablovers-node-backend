import genreL1 from "../models/genrel1Model.js";
import genreL2 from "../models/genrel2Model.js";
import genreL3 from "../models/genrel3Model.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create L1 Genre
export const createGenreL1 = catchAsyncErrors(async (req, res, next) => {
    const newGenre = new genreL1 ({
        ...req.body
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
});

// Create L2 Genre
export const createGenreL2 = catchAsyncErrors(async (req, res, next) => {
    // const genreL1_value = await genreL1.findOne({name: req.body.level1});
    // if(!genreL1_value) {
    //     return next(new ErrorHandler("L1 Genre ID not found.", 404));
    // }
    const newGenre = new genreL2 ({
        name: req.body.name,
        level1: req.body.level1_id
    });
    await newGenre.save();
    res.status(200).json({
        success:true,
        newGenre
    });
 });

// Create L3 Genre
export const createGenreL3 = catchAsyncErrors(async (req, res, next) => {
    // const genreL2_value = await genreL2.findOne({name: req.body.level2});
    // if(!genreL2_value) {
    //     return next(new ErrorHandler("L2 Genre ID not found.", 404));
    // }
    const newGenre = new genreL3 ({
        name: req.body.name,
        level2: req.body.level2_id
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
    let genres_val = [];
    for (let genreno in genresl1) {
        let genrel1 = genresl1[genreno];
        genres_val.push({...genrel1._doc, level_type:1});
    }
    const genresl2 = await genreL2.find();
    for (let genreno in genresl2) {
        let genrel2 = genresl2[genreno];
        let parent_genre = await genreL1.findById(genrel2.level1);
        genres_val.push({...genrel2._doc, level_type:2, parent_genre: parent_genre.name});
    }
    const genresl3 = await genreL3.find();
    for (let genreno in genresl3) {
        let genrel3 = genresl3[genreno];
        let parent_genre = await genreL2.findById(genrel3.level2);
        genres_val.push({...genrel3._doc, level_type:3, parent_genre: parent_genre.name});
    }
    res.status(201).send(genres_val);
});

// Get L1 Genres
export const getL1Genres = catchAsyncErrors(async (req, res, next) => {
    const genresl1 = await genreL1.find();
    let genres_val = [];
    for (let genreno in genresl1) {
        let genrel1 = genresl1[genreno];
        genres_val.push({...genrel1._doc, level_type:1});
    }
    res.status(201).send(genres_val);
});

// Get L2 Genres
export const getL1L2Genres = catchAsyncErrors(async (req, res, next) => {
    const genresl1 = await genreL1.find();
    let genres_val = [];
    for (let genreno in genresl1) {
        let genrel1 = genresl1[genreno];
        let genresl2 = await genreL2.find({level1:genrel1.id});
        genres_val.push({genrel1, children:genresl2});
    }
    res.status(201).send(genres_val);
});

// Get L3 Genres
export const getL3Genres = catchAsyncErrors(async (req, res, next) => {
    const genresl2 = await genreL2.find();
    let genres_val = [];
    for (let genreno in genresl2) {
        let genrel2 = genresl2[genreno];
        let parent_genre = await genreL1.findById(genrel2.level1);
        genres_val.push({...genrel2._doc, level_type:2, parent_genre: parent_genre.name});
    }
    const genresl3 = await genreL3.find();
    for (let genreno in genresl3) {
        let genrel3 = genresl3[genreno];
        let parent_genre = await genreL2.findById(genrel3.level2);
        genres_val.push({...genrel3._doc, level_type:3, parent_genre: parent_genre.name});
    }
    res.status(201).send(genres_val);
});

// Get Replace Genres
export const getReplaceGenres = catchAsyncErrors(async (req, res, next) => {
    const genrel1 = await genreL1.findById(req.params.id);
    if(genrel1) {
        let genres_val = [];
        let genresl1 = await genreL1.find();
        for (let genreno in genresl1) {
            let check_id = genresl1[genreno]._id;
            if (genrel1._id.equals(check_id)) {
                continue;
            }
            genres_val.push(genresl1[genreno]);
        }
        return res.status(201).send(genres_val)
    }
    const genrel2 = await genreL2.findById(req.params.id);
    if(genrel2) {
        let genres_val = [];
        let genresl2 = await genrel2.find();
        for (let genreno in genresl2) {
            let check_id = genresl2[genreno]._id;
            if (genrel2._id.equals(check_id)) {
                continue;
            }
            genres_val.push(genresl2[genreno]);
        }
        return res.status(201).send(genres_val);
    }
    const genrel3 = await genreL3.findById(req.params.id);
    if(genrel3) {
        let genres_val = [];
        let genresl3 = await genrel3.find();
        for (let genreno in genresl3) {
            let check_id = genresl3[genreno]._id;
            if (genrel3._id.equals(check_id)) {
                continue;
            }
            genres_val.push(genresl3[genreno]);
        }
        return res.status(201).send(genres_val);
    }
});

// Get Genre by ID
export const getGenre = catchAsyncErrors(async (req, res, next) => {
    const genrel1 = await genreL1.findById(req.params.id);
    if (genrel1) {
        res.status(201).send(genrel1);
    }
    const genrel2 = await genreL2.findById(req.params.id);
    if (genrel2) {
        res.status(201).send(genrel2);
    }
    const genrel3 = await genreL3.findById(req.params.id);
    if (genrel3) {
        res.status(201).send(genrel3);
    }
    return next(new ErrorHandler("Genre ID not found.", 404));
});

// Update Genre by ID
export const updateGenre = catchAsyncErrors(async (req, res, next) => {
    let genrel1 = await genreL1.findById(req.params.id);
    if(genrel1) {
        genrel1.name = req.body.name;
        genrel1 = await genreL1.findByIdAndUpdate(req.params.id, genrel1, {
            new:true,
            runValidators:true,
            useFindandModify:false
        });
        return res.status(200).json({
            success:true,
            genrel1
        });
    }
    let genrel2 = await genreL2.findById(req.params.id);
    if(genrel2) {
        genrel2.name = req.body.name;
        genrel2 = await genreL2.findByIdAndUpdate(req.params.id, genrel2, {
            new:true,
            runValidators:true,
            useFindandModify:false
        });
        return res.status(200).json({
            success:true,
            genrel2
        });
    }
    let genrel3 = await genreL3.findById(req.params.id);
    if(genrel3) {
        genrel3.name = req.body.name;
        genrel3 = await genreL3.findByIdAndUpdate(req.params.id, genrel3, {
            new:true,
            runValidators:true,
            useFindandModify:false
        });
        return res.status(200).json({
            success:true,
            genrel3
        });
    }
    return next(new ErrorHandler("Genre ID not found.", 404));
});

// Delete Genre by ID
export const deleteGenre = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.replace_id) {
        return next(new ErrorHandler("Replace Id not found.", 404));
    }
    const genrel1_value = await genreL1.findById(req.params.id);
    if(genrel1_value) {
        const genresl2 = await genreL2.find({level1: genrel1_value._id});
        for(let genreno in genresl2) {
            let genrel2 = genresl2[genreno];
            genrel2.level1 = req.body.replace_id;
            await genreL2.findByIdAndUpdate(genrel2._id,genrel2, {
                new:true,
                runValidators:true,
                useFindandModify:false
            });
        }
        await genrel1_value.remove();
        return res.status(200).json({
            success:true,
            message:"L1 Genre deleted successfully."
        });
    }
    const genrel2_value = await genreL2.findById(req.params.id);
    if(genrel2_value) {
        const genresl3 = await genreL3.find({level2: genrel2_value._id});
        for(let genreno in genresl3) {
            let genrel3 = genresl3[genreno];
            genrel3.level2 = req.body.replace_id;
            await genreL3.findByIdAndUpdate(genrel3._id,genrel3, {
                new:true,
                runValidators:true,
                useFindandModify:false
            })
        }
        await genrel2_value.remove();
        return res.status(200).json({
            success:true,
            message:"L2 Genre deleted successfully."
        });
    }
    const genrel3_value = await genreL3.findById(req.params.id);
    if(genrel3_value) {
        await genrel3_value.remove();
        return res.status(200).json({
            success:true,
            message:"L3 Genre deleted successfully."
        });
    }
    return next(new ErrorHandler("Genre ID not found.", 404));
});

// Delete L1 Genre by ID
// export const deleteGenreL1 = catchAsyncErrors(async (req, res, next) => {
//     const genre_value = await genreL1.findById(req.params.id);
//     if(!genre_value) {
//         return next(new ErrorHandler("Genre ID not found.", 404));
//     }
//     await genre_value.remove();
//     res.status(200).json({
//         success:true,
//         message:"L1 Genre deleted successfully."
//     })
// });

// Get L1 Genre by ID
// export const getGenreL1 = catchAsyncErrors(async (req, res, next) => {
//     const genre_value = await genreL2.findById(req.params.id);
//     if(!genre_value) {
//         return next(new ErrorHandler("Genre ID not found.", 404));
//     }
//     res.status(201).send(genre_value);
// });

// Update L1 Genre by ID
// export const updateGenreL1 = catchAsyncErrors(async (req, res, next) => {
//     let genre = await genreL1.findById(req.params.id);
//     if(!genre) {
//         return next(new ErrorHandler("Genre not found.", 404));
//     }
//     genre = await genreL1.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true,
//         useFindandModify:false
//     });
//     res.status(200).json({
//         success:true,
//         genre
//     });
    
//  });

// Get Replace L1 Genres
export const getReplaceGenresL1 = catchAsyncErrors(async (req, res, next) => {
    const genrel1 = await genreL1.findById(req.params.id);
    if(!genrel1) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    let genres_val = [];
    let genresl1 = await genreL1.find();
    for (let genreno in genresl1) {
        let check_id = genresl1[genreno]._id;
        if (genrel1._id.equals(check_id)) {
            continue;
        }
        genres_val.push(genresl1[genreno]);
    }
    return res.status(201).send(genres_val);
});

// Get Replace L2 Genres
export const getReplaceGenresL2 = catchAsyncErrors(async (req, res, next) => {
    const genrel2 = await genreL2.findById(req.params.id);
    if(!genrel2) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    let genres_val = [];
    let genresl2 = await genrel2.find();
    for (let genreno in genresl2) {
        let check_id = genresl2[genreno]._id;
        if (genrel2._id.equals(check_id)) {
            continue;
        }
        genres_val.push(genresl2[genreno]);
    }
    return res.status(201).send(genres_val);
});

// Get Replace L3 Genres
export const getReplaceGenresL3 = catchAsyncErrors(async (req, res, next) => {
    const genrel3 = await genrel3.findById(req.params.id);
    if(!genrel3) {
        return next(new ErrorHandler("Genre ID not found.", 404));
    }
    let genres_val = [];
    let genresl3 = await genrel3.find();
    for (let genreno in genresl3) {
        let check_id = genresl3[genreno]._id;
        if (genrel3._id.equals(check_id)) {
            continue;
        }
        genres_val.push(genresl3[genreno]);
    }
    return res.status(201).send(genres_val);
});

// Get L2 Genres
export const getL2Genres = catchAsyncErrors(async (req, res, next) => {
    const genresl1 = await genreL1.find();
    let genres_val = [];
    for (let genreno in genresl1) {
        let genrel1 = genresl1[genreno];
        genres_val.push({...genrel1._doc, level_type:1});
    }
    const genresl2 = await genreL2.find();
    for (let genreno in genresl2) {
        let genrel2 = genresl2[genreno];
        let parent_genre = await genreL1.findById(genrel2.level1);
        genres_val.push({...genrel2._doc, level_type:2, parent_genre: parent_genre.name});
    }
    res.status(201).send(genres_val);
});