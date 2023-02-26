import booksInventory from "../models/booksInventoryModel.js";

// Create Books Inventory
export const createBooksInventory = async (req, res, next) => {
    try {
        const newBooksInventory = new booksInventory ({
            ...req.body,
        });
        await newBooksInventory.save();
        res.status(201).send("BooksInventory has been added.");
    } catch(err) {
        next(err);
    }
}

// Get All Books Inventories
export const getAllBooksInventory = async (req, res, next) => {
    try{
        const books_inventories = await booksInventory.find();
        res.status(201).send(books_inventories);
    } catch(err) {
        next(err);
    }
} 