const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        name: String,
        creator: String,
        tags: [String],
        imageFile: String,
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
