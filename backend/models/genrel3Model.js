import mongoose from "mongoose";
const { Schema } = mongoose;

const genreL3Schema = new Schema({
    name: {
        type: String,
        required: [ true, "Genre Name is required."],
        unique: [ true, "Genre Name should be unique."],
    },
    level2: {
        type: String,
        required: [ true, "Genre Name is required."],
        unique: [ true, "Genre Name should be unique."],
    }
}
, {
    timestamps:true,
});

export default mongoose.model("GenreL3", genreL3Schema)