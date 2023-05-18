import mongoose from "mongoose";
const { Schema } = mongoose;

const genreL1Schema = new Schema({
    name: {
        type: String,
        required: [ true, "Genre Name is required."],
        unique: [ true, "Genre Name should be unique."],
    }
}
, {
    timestamps:true,
});

export default mongoose.model("GenreL1", genreL1Schema)