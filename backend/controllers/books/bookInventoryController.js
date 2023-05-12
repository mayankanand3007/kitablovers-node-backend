import Book from "../../models/books/bookModel.js";
import booksInventory from "../../models/books/booksInventoryModel.js";
import booksCondition from "../../models/books/bookConditionModel.js";
import warehouseCity from "../../models/books/warehouseCityModel.js";
import ErrorHandler from "../../utils/errorhandler.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Create Books Inventory
export const createBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const response = await createBooksISBN(req.body.isbn);
    if(!response){
        return next(new ErrorHandler("Book ISBN not found.", 404));
    }
    const newBooksInventory = new booksInventory ({
        ...req.body,
    });
    await newBooksInventory.save();
    res.status(200).json({
        success:true,
        newBooksInventory
    });
});

async function createBooksISBN (isbn) {
    // const url = "https://www.googleapis.com/books/v1/volumes?q=isbn=" + newBooksInventory["isbn"];
    // request(url, library = (err, res, body) => {
    //     // pass
    // });
    // Check if ISBN is already present in DB.
    const check_isbn = await Book.findOne({isbn:isbn});
    if (!check_isbn) {
        let data = await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)).json();
        // Check if ISBN is available in Google Books API.
        if (data.totalItems === 0) {
            return false;
        }
        else {
            const book = data.items[0].volumeInfo;
            // Check if All Book Attributes are there.
            if (book.title && book.subtitle && book.authors && book.imageLinks.thumbnail && book.publisher && book.publishedDate && book.language && book.pageCount) {
                let thumbnail_bson = "";
                let fig = await fetch(book.imageLinks.thumbnail);
                thumbnail_bson = Buffer.from(await fig.arrayBuffer());
                const newBook = new Book({
                    id: id,
                    isbn: isbn,
                    genre: [0],
                    title: book.title,
                    subtitle: book.subtitle,
                    author: book.authors,
                    thumbnail: thumbnail_bson,
                    description: book.description,
                    publisher: book.publisher,
                    publishedOn: book.publishedDate,
                    language: book.language,
                    pageCount: book.pageCount
                });
                newBook.save();
            }
            else {
                let book_copy = book;
                if (!book.title) {
                    book_copy.title = " ";
                }
                if (!book.subtitle) {
                    book_copy.subtitle = " ";
                }
                if (!book.authors) {
                    book_copy.authors = " ";
                }
                let thumbnail_bson = "";
                if (!book.imageLinks.thumbnail) {
                    thumbnail_bson = " ";
                }
                else {
                    let fig = await fetch(book.imageLinks.thumbnail);
                    thumbnail_bson = Buffer.from(await fig.arrayBuffer());
                }
                if (!book.publisher) {
                    book_copy.publisher = " ";
                }
                if (!book.publishedDate) {
                    book_copy.publishedDate = " ";
                }
                if (!book.language) {
                    book_copy.language = " ";
                }
                if (!book.pageCount) {
                    book_copy.pageCount = " ";
                }
                const newBook = new Book({
                    isbn: isbn,
                    genre: [0],
                    title: book_copy.title,
                    subtitle: book_copy.subtitle,
                    author: book_copy.authors,
                    thumbnail: thumbnail_bson,
                    description: book_copy.description,
                    publisher: book_copy.publisher,
                    publishedOn: book_copy.publishedDate,
                    language: book_copy.language,
                    pageCount: book_copy.pageCount
                });
                newBook.save();
            }
        }
    }
    return true;
}

// Get All Books Inventories
export const getAllBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.find();
    let book_inventory_resp = [];
    for (let book_inventory in books_inventories) {
        const book_inventory_pricing = books_inventories[book_inventory].pricing;
        let book_condition_val = [];
        for (let book_pricing in book_inventory_pricing) {
            let book_val_data = await booksCondition.findById(book_inventory_pricing[book_pricing].book_condition);
            if (book_val_data.length != 0) {
                book_condition_val.push(
                    book_val_data
                )
            }
            book_inventory_pricing[book_pricing].book_condition = book_condition_val;
        }
        const book_inventory_stock = books_inventories[book_inventory].inventory;
        let warehouse_city_val = [];
        book_condition_val = [];
        for (let book_pricing in book_inventory_stock) {
            let book_val_data = await booksCondition.findById(book_inventory_stock[book_pricing].book_condition);
            if (book_val_data.length != 0) {
                book_condition_val.push(
                    book_val_data
                )
            }
            let warehouse_val_data = await warehouseCity.findById(book_inventory_stock[book_pricing].city);
            if (warehouse_val_data.length != 0) {
                warehouse_city_val.push(
                    warehouse_val_data
                )
            }
            book_inventory_stock[book_pricing].book_condition = book_condition_val;
            book_inventory_stock[book_pricing].warehouse_city = warehouse_city_val;
        }
        book_inventory_resp.push(
        {
            id: books_inventories[book_inventory].id, 
            isbn: books_inventories[book_inventory].isbn, 
            mrp: books_inventories[book_inventory].mrp, 
            pricing: books_inventories[book_inventory].pricing, 
            inventory: books_inventories[book_inventory].inventory
        });
    }
    res.status(200).json({
        success:true,
        books_inventories
    });
});

// Get Books Inventory by ID
export const getBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories){
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    res.status(200).json({
        success:true,
        books_inventories
    });
});

// Update Books Inventory by ID
export const updateBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }
    
    books_inventories = await booksInventory.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        books_inventories
    });

 });

// Update MRP in Books Inventory by ID
export const updateMRPBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    const books_inventories_val = {
        isbn: booksInventory.isbn,
        mrp: req.body.mrp, 
        pricing: booksInventory.pricing, 
        inventory: booksInventory.inventory
    }

    let resp = await booksInventory.findByIdAndUpdate(req.params.id, books_inventories_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        resp
    });

});

// Add Pricing in Books Inventory by ID
export const addPricingBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    books_inventories.pricing.push(req.body);

    const books_inventories_val = {
        isbn: books_inventories.isbn,
        mrp: books_inventories.mrp, 
        pricing: books_inventories.pricing,
        inventory: books_inventories.inventory
    }

    let resp = await booksInventory.findByIdAndUpdate(req.params.id, books_inventories_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        resp
    });

 });

// Update Pricing in Books Inventory by ID
export const updatePricingBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }
    
    for (let each_pricing in books_inventories.pricing) {
        if (books_inventories.pricing[each_pricing].id === req.params.pricingid) {
            books_inventories.pricing[each_pricing].book_condition = req.body.book_condition;
            books_inventories.pricing[each_pricing].price = req.body.price;
        }
    }

    let resp = await booksInventory.findByIdAndUpdate(req.params.id, books_inventories,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        resp
    });

 });

 // Add Inventory in Books Inventory by ID
export const addInventoryBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    books_inventories.inventory.push(req.body);

    const books_inventories_val = {
        isbn: booksInventory.isbn,
        mrp: booksInventory.mrp, 
        pricing: booksInventory.pricing, 
        inventory: books_inventories.inventory
    }
    
    let resp = await booksInventory.findByIdAndUpdate(req.params.id, books_inventories_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        resp
    });

 });

 // Update Inventory in Books Inventory by ID
export const updateInventoryBooksInventory = catchAsyncErrors(async (req, res, next) => {
    let books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories) {
        return next(new ErrorHandler("Inventory Record not found.", 404));
    }

    for (let each_inventory in books_inventories.inventory) {
        if (books_inventories.inventory[each_inventory].id === req.params.inventoryid) {
            books_inventories.inventory[each_inventory].book_condition = req.body.book_condition;
            books_inventories.inventory[each_inventory].city = req.body.city;
            books_inventories.inventory[each_inventory].quantity = req.body.quantity;
            books_inventories.inventory[each_inventory].location = req.body.location;
        }
    }
    
    let resp = await booksInventory.findByIdAndUpdate(req.params.id, books_inventories,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        resp
    });

 });

// Delete Books Inventory by ID
export const deleteBooksInventory = catchAsyncErrors(async (req, res, next) => {
    const books_inventories = await booksInventory.findById(req.params.id);

    if(!books_inventories){
        return res.status(500).json({
            success:false,
            message:"Inventory Record not found."
        })
    }

    await books_inventories.remove();

    res.status(200).json({
        success:true,
        message:"Books Inventory deleted successfully."
    })
});