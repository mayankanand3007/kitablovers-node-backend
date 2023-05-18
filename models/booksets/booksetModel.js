import mongoose from "mongoose";
const { Schema } = mongoose;

const booksetSchema = new Schema({
    title: {
        type: String,
        required: [ true, "Book Set Title is required."],
     },
     thumbnail: {
         type: Buffer,
         required: true,
     },
     description: {
         type: String,
         required: [ true, "Description is required."],
     },
    mrp: {
        type: Number,
        required: [ true, "MRP is required."],
        default: 0
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag"
    }],
    book_count: {
        type: Number,
        required: [ true, "Book Count is required."],
        default: 1
    },
    pricing: [{
        book_condition: {
            type: String,
            required: [ true, "Book Condition for Price is required."],
        },
        price: {
            type: Number,
            required: [ true, "Price is required."],
            default: 0
        }
    }],
    inventory:[{
        book_condition: {
            type: String,
            required: [ true, "Book Condition for Inventory is required."],
        },
        city: {
            type: String,
            required: [ true, "Warehouse City is required."],
        },
        quantity: {
            type: Number,
            required: [ true, "Quantity is required."],
            default: 1
        },
        location: {
            type: String,
            required: [ true, "Stock Location is required."],
        }
    }],
    reviews:[{
        user_id:{
            type: String,
            required: [ true, "User ID is required."],
        },
        rating:{
            type: Number,
            required: [ true, "Rating is required."],
            minLength: [1, ""],
            maxLength: [5, ""]
        },
        comment:{
            type:String,
            required: true, 
        }
    }]
}, {
    timestamps:true,
});

export default mongoose.model("Booksets", booksetSchema)