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
    }]
}, {
    timestamps:true,
});

export default mongoose.model("Merchandise", merchandiseSchema)