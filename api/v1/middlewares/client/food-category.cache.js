const redis = require("../../../../config/redis")
const client = redis.connectRedis()
module.exports.cacheCategories = async (req, res, next) => {
    const data = await client.get("categories");
    if(data) {
        res.json(JSON.parse(data))
    }
    else {
        next()
    }
}