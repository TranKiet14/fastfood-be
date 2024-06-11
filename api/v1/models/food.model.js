const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);

const foodSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        thumbnail: String,
        status: String,
        featured: String,
        position: Number,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodCategory"
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
)
const Food = mongoose.model('Food', foodSchema, "foods");

module.exports = Food;