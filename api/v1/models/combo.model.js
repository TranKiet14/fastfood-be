const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);

const comboSchema = new mongoose.Schema(
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
        listFoods: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Food'
                },
                quantity: Number
            }
        ],
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
)
const Combo = mongoose.model('Combo', comboSchema, "combos");

module.exports = Combo;