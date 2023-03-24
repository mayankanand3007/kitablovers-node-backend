import mongoose from "mongoose";
const { Schema } = mongoose;

const genreL3Schema = new Schema({
    name: {
        type: String,
        required: [ true, "Genre Name is required."],
        unique: [ true, "Genre Name should be unique."],
    },
    level2: {
        type: mongoose.Schema.ObjectId,
        ref: "GenreL2",
        required: [ true, "Genre Name is required."]
    }
}
, {
    timestamps:true,
});

export default mongoose.model("GenreL3", genreL3Schema)