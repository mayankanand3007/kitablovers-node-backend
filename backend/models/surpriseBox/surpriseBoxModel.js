import mongoose from "mongoose";
const { Schema } = mongoose;

const surpriseBoxSchema = new Schema({
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
    gift_wrap: {
        type: Boolean,
        required: [ true, "Gift Wrap is required."],
        default: false
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag"
    }],
    pricing: [{
        genre: {
            type: String,
            required: [ true, "Genre for Price is required."],
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

export default mongoose.model("SurpriseBox", surpriseBoxSchema)