import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
       type: String,
       required: [ true, "Merchandise Category is required."],
       unique: [ true, "Merchandise Category name should be unique."]
    }
}, {
    timestamps:true,
});

export default mongoose.model("MerchandiseCategory", CategorySchema)