import Book from "../models/bookModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    let book_resp = [];
    for (let book in books) {
        all= fs.createWriteStream("out."+imgtype);
        for(i=0; i<end; i++){
            var buffer = new Buffer( new Uint8Array(picarray[i]) );
            all.write(buffer);
        }
        all.end();
        book_resp.push(book._id, book.isbn, book.genre, book.title, book.subtitle, book.author, book.publisher, book.publisher, book.publishedOn, book.language, book.pageCount, book.images, book.tags);
    }
    res.status(201).send(books);
});

// Update Book by ID
export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let books = Book.findById(req.params.id);

    if(!books) {
        return next(new ErrorHandler("Book Condition not found.", 404));
    }

    books = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        books
    });
    
 });