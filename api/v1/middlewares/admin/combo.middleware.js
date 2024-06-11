module.exports.view = async (req, res, next) => {
    if(req.user.role && req.user.role.permissions.includes("combos_view")){
        next();
    }
    else {
        res.status(403).json({
            code: 403,
            message: "Bạn không đủ quyền truy cập!!!"
        })
    }
}
module.exports.create= async (req, res, next) => {
    if(req.user.role && req.user.role.permissions.includes("combos_create")){
        next();
    }
    else {
        res.status(403).json({
            code: 403,
            message: "Bạn không đủ quyền truy cập!!!"
        })
    }
}
module.exports.edit = async (req, res, next) => {
    if(req.user.role && req.user.role.permissions.includes("combos_edit")){
        next();
    }
    else {
        res.status(403).json({
            code: 403,
            message: "Bạn không đủ quyền truy cập!!!"
        })
    }
}
module.exports.delete = async (req, res, next) => {
    if(req.user.role && req.user.role.permissions.includes("combos_delete")){
        next();
    }
    else {
        res.status(403).json({
            code: 403,
            message: "Bạn không đủ quyền truy cập!!!"
        })
    }
}