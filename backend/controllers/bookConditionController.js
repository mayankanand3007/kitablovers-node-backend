import bookCondition from "../models/bookConditionModel.js";

// Create Book Condition
export const createBookCondition = async (req, res, next) => {
    try {
        const newBookCondition = new bookCondition ({
            ...req.body,
        });
        await newBookCondition.save();
        res.status(201).send("Book Condition has been added.");
    } catch(err) {
        next(err);
    }
}

// Get All Book Conditions
export const getAllBookConditions = async (req, res, next) => {
    try{
        const books_conditions = await bookCondition.find();
        res.status(201).send(books_conditions);
    } catch(err) {
        next(err);
    }
}