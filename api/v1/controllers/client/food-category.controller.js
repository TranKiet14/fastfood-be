const FoodCategory = require("../../models/food-category.model");
const redis = require("../../../../config/redis")
const client = redis.connectRedis()

// [GET] /api/v1/client/food-category
module.exports.index = async (req, res) => {
    const foodsCategory = await FoodCategory.find({
        deleted: false,
        status: "active"
    })
    await client.set("categories", JSON.stringify(foodsCategory))
    res.json(foodsCategory);
}