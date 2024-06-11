const FoodCategory = require("../../models/food-category.model");

// [GET] /api/v1/client/food-category
module.exports.index = async (req, res) => {
    const foodsCategory = await FoodCategory.find({
        deleted: false,
        status: "active"
    })
    res.json(foodsCategory);
}