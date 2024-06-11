const Combo = require("../../models/combo.model")
const searchHelper = require("../../../../helpers/search")
const paginationHelper = require("../../../../helpers/pagination")
const FoodCategory = require("../../models/food-category.model")

// [GET] /api/v1/client/combos
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
    const countCombos = await Combo.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 10
        },
        req.query,
        countCombos
    )
    //Hết pagination

    //Sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //Hết sort
    const combos = await Combo.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.json(combos);
}

// [GET] /api/v1/client/combos/detail/:slugCombo
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            status: "active",
            slug: req.params.slugCombo
        }
        const combo = await Combo.findOne(find);
        res.json(combo)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!!"
        })
    }
}

// [GET] /api/v1/client/combos/category/:slugCategory
module.exports.comboCategory = async (req, res) => {
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
        const countCombos = await Combo.countDocuments(find);
        let objectPagination = paginationHelper(
            {
                currentPage: 1,
                limitItems: 10
            },
            req.query,
            countCombos
        )
        //Hết pagination

        //Sort
        const sort = {}
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue
        }
        //Hết sort
        const combos = await Combo.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip);
        res.json(combos)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!!"
        })
    }
}