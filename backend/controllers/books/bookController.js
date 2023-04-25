import Book from "../../models/books/bookModel.js";
import catchAsyncErrors from "../../middleware/catchAsyncErrors.js";

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    let book_resp = [];
    for (let book in books) {
        book_resp.push(
            {
                id: books[book].id, 
                isbn: books[book].isbn, 
                genre: books[book].genre, 
                title: books[book].title, 
                subtitle: books[book].subtitle, 
                thumbnail: Buffer.from(books[book].thumbnail).toString("base64"),
                author: books[book].author, 
                description: books[book].description, 
                publisher: books[book].publisher,
                publishedOn: books[book].publishedOn,
                edition: books[book].edition, 
                language: books[book].language, 
                pageCount: books[book].pageCount, 
                ageGroup: books[book].ageGroup, 
                binding: books[book].binding, 
                height: books[book].height, 
                width: books[book].width, 
                spineWidth: books[book].spineWidth, 
                weight: books[book].weight, 
                images: books[book].images, 
                tags: books[book].tags
            });
    }
    res.status(201).json({
        success:true,
        book_resp
    });
});

// Update Book by ID
export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let books = Book.findById(req.params.id);

    if(!books) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    let book_val = {
        id: req.body.id,
        isbn: req.body.isbn, 
        genre: req.body.genre, 
        title: req.body.title, 
        subtitle: req.body.subtitle,
        author: req.body.author, 
        description: req.body.description, 
        publisher: req.body.publisher,
        publishedOn: req.body.publishedOn,
        edition: req.body.edition, 
        language: req.body.language, 
        pageCount: req.body.pageCount, 
        ageGroup: req.body.ageGroup, 
        binding: req.body.binding, 
        height: req.body.height, 
        width: req.body.width, 
        spineWidth: req.body.spineWidth, 
        weight: req.body.weight, 
        images: req.body.images, 
        tags: req.body.tags
    }
    if(req.body.thumbnail) {
        book_val.thumbnail = Buffer.from(req.body.thumbnail, "base64");
    }

    books = await Book.findByIdAndUpdate(req.params.id,book_val,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        book_val
    });
    
 });