import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
    isbn: {
        type: Number,
        required: [ true, "ISBN is required."],
        unique: [ true, "ISBN should be a unique value."], 
        minLength: [10, "ISBN should be atleast 10 digit long."],
        maxLength: [13, "ISBN can only be 13 digit long."]
     },
     genre: [{
        name: {
         type: String,
         required: [ true, "Genre Names is required."]
        }
    }],
    title: {
       type: String,
       required: [ true, "Book Title is required."],
    },
    subtitle: {
        type: String,
        required: [ true, "Book Subtitle is required."],
    },
    author: {
        type: String,
        required: [ true, "Author is required."],
    },
    thumbnail: {
        type: String,
        required: [ true, "Thumbnail URL is required."],
    },
    description: {
        type: String,
        required: [ true, "Description is required."],
    },
    publisher: {
        type: String,
        required: [ true, "Publisher is required."],
    },
    publishedDate: {
        type: String,
        required: [ true, "Published Date is required."],
    },
    edition: {
        type: String,
    },
    language: {
        type: String,
        required: [ true, "Language is required."],
    },
    pageCount: {
        type: String,
        required: [ true, "Thumbnail URL is required."],
    },
    ageGroup: {
        type: String,
    },
    binding: {
        type: String,
    },
    height: {
        type: String,
    },
    width: {
        type: String,
    },
    spineWidth: {
        type: String,
    },
    images: [{
        url: {
            type: String,
        },
        name: {
            type: String,
        }
    }],
    tags: [{
        name: {
            type: String,
        }
    }],
    thickness: [{
        name: {
            type: String,
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
    }
    ]
}, {
    timestamps:true,
});

export default mongoose.model("Book", bookSchema)