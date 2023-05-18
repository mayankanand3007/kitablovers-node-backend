import mongoose from "mongoose";
const { Schema } = mongoose;

const booksInventorySchema = new Schema({
    isbn: {
        type: Number,
        required: [true, "ISBN is required."],
        unique: [true, "ISBN should be a unique value."],
        minLength: [10, "ISBN should be atleast 10 digit long."],
        maxLength: [13, "ISBN can only be 13 digit long."]
    },
    mrp: {
        type: Number,
        required: [true, "MRP is required."],
        default: 0
    },
    pricing: [{
        book_condition: {
            type: mongoose.Schema.ObjectId,
            ref: "BookCondition",
            required: [true, "Book Condition is required."]
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
            default: 0
        }
    }],
    inventory: [{
        book_condition: {
            type: mongoose.Schema.ObjectId,
            ref: "BookCondition",
            required: [true, "Book Condition is required."]
        },
        city: {
            type: mongoose.Schema.ObjectId,
            ref: "WarehouseCity",
            required: [true, "Warehouse City is required."]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required."],
            default: 1
        },
        location: {
            type: String,
            required: [true, "Stock Location is required."],
        },
    }]
}, {
    timestamps: true,
});

export default mongoose.model("BooksInventory", booksInventorySchema)