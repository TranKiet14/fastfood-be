const FoodCategory = require("../../models/food-category.model");

// [GET] /api/v1/admin/food-category
module.exports.index = async (req, res) => {
    const foodsCategory = await FoodCategory.find({
        deleted: false
    })
    res.json(foodsCategory);
}

// [POST] /api/v1/admin/food-category/create
module.exports.create = async (req, res) => {
    try {
        const category = new FoodCategory(req.body);
        const data = await category.save(category);

        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!"
        });
        console.log(error)
    }
}

//[PATCH] /api/v1/admin/food-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await FoodCategory.updateOne({
            _id: categoryId
        }, req.body)
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!"
        });
    }
}

//[PATCH] /api/v1/admin/food-category/delete/:id 
module.exports.delete = async (req,res) => {
    try {
        const categoryId = req.params.id;
        await FoodCategory.updateOne({
            _id: categoryId
        }, {
            deleted: true,
            deletedAt: new Date()
        })
        res.json({
            code: 200,
            message: "Xóa thành công!"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!"
        });
    }
}

//[PATCH] /api/v1/admin/food-category/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await FoodCategory.updateOne({
            _id: id
        }, {
            status: status
        })
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Cập nhật trạng thái không thành công!!!"
        });
    }
}

//[PATCH] /api/v1/admin/food-category/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                await FoodCategory.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                });
                break;
            case "deleted":
                await FoodCategory.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                })
                res.json({
                    code: 200,
                    message: "Xóa thành công!"
                });
                break;
            default:
                res.status(400).json({
                    code: 400,
                    message: "Lỗi!"
                });
                break;
        }
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!"
        });
    }
}