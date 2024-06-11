const Role = require("../../models/role.model");

// [GET] /api/v1/admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    const roles = await Role.find(find);
    res.json(roles)
}

//[POST] /api/v1/admin/roles/create
module.exports.create = async (req, res) => {
    try {
        const role = new Role(
            {
                title: req.body.title,
                description: req.body.description,
                permissions: req.body.permissions
            }
        );
        const data = await role.save();
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

//[PATCH] /api/v1/admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        await Role.updateOne({
            _id: id
        }, {
            title: req.body.title,
            description: req.body.description,
            permissions: req.body.permissions
        })
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
