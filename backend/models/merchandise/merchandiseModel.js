import mongoose from "mongoose";
const { Schema } = mongoose;

const merchandiseSchema = new Schema({
    title: {
        type: String,
        required: [ true, "Book Set Title is required."],
    },
    thumbnail: {
        type: Buffer,
        required: true,
    },
    mrp: {
        type: Number,
        required: [ true, "MRP is required."],
        default: 0
    },
    price: {
        type: Number,
        required: [ true, "Price is required."],
        default: 0
    },
    quantity: {
        type: Number,
        required: [ true, "Quantity is required."],
        default: 1
    },
    location: {
        type: String,
        required: [ true, "Stock Location is required."],
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag"
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

export default mongoose.model("Merchandise", merchandiseSchema)