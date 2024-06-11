const Account = require("../../models/account.model")
const jwt = require("jsonwebtoken")
module.exports.requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1];
        // const accessToken = req.headers.authorization // axios
        try {
            const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            const account = await Account.findOne({
                _id: data.id,
                deleted: false
            }).select("-password -access_token -refresh_token").populate("role")
            if(!account) {
                res.status(403).json({
                    code: 403,
                    message: "Không có quyền truy cập!"
                });
            } else {
                req.user = account;
                next();
            }
        } catch (error) {
            res.status(401).json({
                code: 401,
                message: "Token không hợp lệ!!!"
            })
        }
    }
    else {
        res.status(401).json({
            code: 401,
            message: "Token không hợp lệ!!!"
        })
    }
}
