import mongoose from "mongoose";
const { Schema } = mongoose;

const tagSchema = new Schema({
    name: {
       type: String,
       required: [ true, "Tag Name is required."],
       unique: [ true, "Tag Name should be unique."]
    }
}, {
    timestamps:true,
});

export default mongoose.model("Tag", tagSchema)