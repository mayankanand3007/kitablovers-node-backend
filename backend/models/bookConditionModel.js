import mongoose from "mongoose";
const { Schema } = mongoose;

const bookConditionSchema = new Schema({
    name: {
       type: String,
       required: [ true, "Book Condition name is required."],
       unique: [ true, "Book Condition value should be unique."]
    }
}, {
    timestamps:true,
});

export default mongoose.model("BookCondition", bookConditionSchema)