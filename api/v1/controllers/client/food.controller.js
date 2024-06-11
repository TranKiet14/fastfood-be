const Food = require("../../models/food.model")
const FoodCategory = require("../../models/food-category.model")
const searchHelper = require("../../../../helpers/search")
const paginationHelper = require("../../../../helpers/pagination")

// [GET] /api/v1/client/foods
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status: "active"
    }

    //Search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    //Hết Search

    //Pagination
    const countFoods = await Food.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 10
        },
        req.query,
        countFoods
    )
    //Hết pagination

    //Sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //Hết sort

    const foods = await Food.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.json(foods);
}

// [GET] /api/v1/client/foods/detail/:slugFood
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            status: "active",
            slug: req.params.slugFood
        }
        const food = await Food.findOne(find);
        res.json(food)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!!"
        })
    }
}

// [GET] /api/v1/client/foods/category/:slugCategory
module.exports.foodCategory = async (req, res) => {
    try {
        const findCategory = {
            deleted: false,
            status: "active",
            slug: req.params.slugCategory
        }
        const category = await FoodCategory.findOne(findCategory);
        const find = {
            deleted: false,
            status: "active",
            category: category._id
        }
        //Search
        const objectSearch = searchHelper(req.query);
        if (objectSearch.regex) {
            find.title = objectSearch.regex
        }
        //Hết Search

        //Pagination
        const countFoods = await Food.countDocuments(find);
        let objectPagination = paginationHelper(
            {
                currentPage: 1,
                limitItems: 10
            },
            req.query,
            countFoods
        )
        //Hết pagination

        //Sort
        const sort = {}
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue
        }
        //Hết sort
        const foods = await Food.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
        res.json(foods)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!!"
        })
    }
}