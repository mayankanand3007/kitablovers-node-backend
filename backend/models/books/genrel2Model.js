import mongoose from "mongoose";
const { Schema } = mongoose;

const genreL2Schema = new Schema({
    name: {
        type: String,
        required: [ true, "Genre Name is required."],
        unique: [ true, "Genre Name should be unique."],
    },
    level1: {
        type: mongoose.Schema.ObjectId,
        ref: "GenreL1",
        required: [ true, "Genre Name is required."]
    }
}
, {
    timestamps:true,
});

export default mongoose.model("GenreL2", genreL2Schema)