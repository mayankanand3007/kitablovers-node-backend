import Book from "../models/bookModel.js";
import fetch from "node-fetch";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Create Book using ISBN
export const createBookFromISBN = catchAsyncErrors(async (req, res, next) => {
    const bookISBN = new Book ({
        ...req.body,
    });
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookISBN.isbn}`)
    .then(res => res.json())
    .then(data => {
        if (data.totalItems != 0) {
            const book = data.items[0];
            console.log(`Genre: ${book.volumeInfo.categories}`);
            console.log(`Title: ${book.volumeInfo.title}`);
            console.log(`Subtitle: ${book.volumeInfo.subtitle}`);
            console.log(`Author(s): ${book.volumeInfo.authors}`);
            console.log(`Thumbnail URL: ${book.volumeInfo.imageLinks.thumbnail}`);
            console.log(`Description: ${book.volumeInfo.description}`);
            console.log(`Publisher: ${book.volumeInfo.publisher}`);
            console.log(`Published Date: ${book.volumeInfo.publishedDate}`);
            console.log(`Language: ${book.volumeInfo.language}`);
            console.log(`Page Count: ${book.volumeInfo.pageCount}`);
        }
    });
});