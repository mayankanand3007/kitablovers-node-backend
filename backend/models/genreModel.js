import mongoose from "mongoose";
const { Schema } = mongoose;

const genreSchema = new Schema({
    genre: [{
        name: {
            type: String,
            required: [ true, "Genre Name is required."],
            unique: [ true, "Genre Name should be unique."],
        },
        level2: [{
            name: {
                type: String,
            },
            level3: [{
                name: {
                    type: String,
                }
        }]
    }]
}]
}, {
    timestamps:true,
});

export default mongoose.model("Genre", genreSchema)