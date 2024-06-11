const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const foodCategorySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema, "foods-category");

module.exports = FoodCategory;