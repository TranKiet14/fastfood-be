const Food = require("../../models/food.model")

// [GET] /api/v1/admin/foods
module.exports.index = async (req, res) => {
    const foods = await Food.find({
        deleted: false
    }).populate("category").sort({position: "asc"})
    res.json(foods);
}

// [GET] /api/v1/admin/foods/detail/:id
module.exports.detail = async (req, res) => {
    const food = await Food.findOne({
        deleted: false,
        _id: req.params.id
    }).populate("category")
    res.json(food);
}

// [POST] /api/v1/admin/foods/create
module.exports.create = async (req, res) => {
    try {
        const food = new Food(req.body);
        const data = await food.save(food);

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
    }
}

//[PATCH] /api/v1/admin/foods/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const foodId = req.params.id;
        req.body.price = req.body.price ? parseInt(req.body.price) : undefined;
        req.body.discountPercentage = req.body.discountPercentage ? parseInt(req.body.discountPercentage) : undefined;
        req.body.position = req.body.position ? parseInt(req.body.position) : undefined;
        await Food.updateOne({
            _id: foodId
        }, req.body)
        res.json({
            code: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: 400,
            message: "Lỗi!"
        });
        
    }
}

//[PATCH] /api/v1/admin/foods/delete/:id 
module.exports.delete = async (req, res) => {
    try {
        const foodId = req.params.id;
        await Food.updateOne({
            _id: foodId
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

//[PATCH] /api/v1/admin/foods/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await Food.updateOne({
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
//[PATCH] /api/v1/admin/foods/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                await Food.updateMany({
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
                await Food.updateMany({
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

