const Combo = require("../../models/combo.model");

// [GET] /api/v1/admin/combos
module.exports.index = async (req,res) => {
    const combos = await Combo.find({
        deleted: false
    }).populate("category")
    res.json(combos);
}

// [GET] /api/v1/admin/combos/detail/:id
module.exports.detail = async (req,res) => {
    const combo = await Combo.findOne({
        deleted: false,
        _id: req.params.id
    }).populate("category")
    res.json(combo);
}

// [POST] /api/v1/admin/create
module.exports.create = async (req,res) => {
    try {
        const combo = new Combo(req.body);
        const data = await combo.save(combo);

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

//[PATCH] /api/v1/admin/combos/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const comboId = req.params.id;
        req.body.price = req.body.price ? parseInt(req.body.price) : undefined;
        req.body.discountPercentage = req.body.discountPercentage ? parseInt(req.body.discountPercentage) : undefined;
        req.body.position = req.body.position ? parseInt(req.body.position) : undefined;
        await Combo.updateOne({
            _id: comboId
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
        console.log(error)
    }
}

//[PATCH] /api/v1/admin/combos/delete/:id 
module.exports.delete = async (req,res) => {
    try {
        const comboId = req.params.id;
        await Combo.updateOne({
            _id: comboId
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

//[PATCH] /api/v1/admin/combos/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await Combo.updateOne({
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
//[PATCH] /api/v1/admin/combos/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const ids = req.body.ids;
        const key = req.body.key;
        const value = req.body.value;
        switch (key) {
            case "status":
                await Combo.updateMany({
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
                await Combo.updateMany({
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
