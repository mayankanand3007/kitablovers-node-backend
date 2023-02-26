import mongoose from "mongoose";
const { Schema } = mongoose;

const booksInventorySchema = new Schema({
    isbn: {
       type: Number,
       required: true,
       unique: true
    },
    mrp: {
        type: Number,
        required: true
    },
    pricing: [{
        book_condition: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    inventory:[{
        book_condition: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
    }]
}, {
    timestamps:true,
});

export default mongoose.model("BooksInventory", booksInventorySchema)