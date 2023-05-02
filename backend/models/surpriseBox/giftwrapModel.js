import mongoose from "mongoose";
const { Schema } = mongoose;

const giftWrapSchema = new Schema({
    gift_wrap: {
        type: Boolean,
        required: [ true, "Gift Wrap is Required."],
        default: false
    },
    price: {
        type: Number,
        required: [ true, "Gift Wrap Price is Required."],
        default: 0
    }
}, {
    timestamps:true,
});

export default mongoose.model("GiftWrapPrice", giftWrapSchema)