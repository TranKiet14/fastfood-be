const jwt = require("jsonwebtoken");
const Account = require("../../models/account.model");
module.exports.index = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken){
        res.status(401).json({
            code: 401,
            message: "Token không hợp lệ!!!"
        })
        return;
    } 
    try {
        const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const account = await Account.findOne({
            _id: data.id,
            deleted: false
        }).select("-password")
        if(!account) {
            res.status(403).json({
                code: 403,
                message: "Không có quyền truy cập!"
            });
            return;
        }
        if(!account.refresh_token.includes(refreshToken)){
            res.status(403).json({
                code: 403,
                message: "Không có quyền truy cập!"
            });
            return;
        }
        for(const item of account.access_token){
            try {
                jwt.verify(item, process.env.ACCESS_TOKEN_SECRET);
            } catch (error) {
                await Account.updateOne({
                    _id: account._id
                }, {
                    $pull: {
                        access_token: item
                    }
                })
            }
        }
        const newAccessToken = jwt.sign({
            id: account._id,
            fullName: account.fullName
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        await Account.updateOne({
            _id: account._id
        }, {
            $push: {
                access_token: newAccessToken
            }
        })
        res.json({
            access_token: newAccessToken
        })
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: "Token không hợp lệ!!!"
        })
    }
}