const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Account = require("../../models/account.model")
// [GET] /api/v1/admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    const accounts = await Account.find(find).select("-password -access_token -refresh_token").populate("role");
    res.json(accounts)
}

//[POST] /api/v1/admin/accounts/create
module.exports.create = async (req, res) => {
    try {
        const existEmail = await Account.findOne({
            email: req.body.email,
            deleted: false
        })
        if (existEmail) {
            res.status(400).json(
                {
                    code: 400,
                    message: "Email đã tồn tại!"
                }
            )
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const infoAccount = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
            avatar: req.body.avatar,
            role: req.body.role,
            status: req.body.status
        }
        const record = new Account(infoAccount);
        await record.save();
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công!"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!"
        })
    }
}

//[PATCH] /api/v1/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const accountId = req.params.id;
        const emailExist = await Account.findOne({
            _id: { $ne: accountId },
            email: req.body.email,
            deleted: false
        });
        if (emailExist) {
            res.status(400).json({
                code: 400,
                message: "Email đã tồn tại"
            })
            return;
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            req.body.password = passwordHash
        } else {
            delete req.body.password
        }
        await Account.updateOne({
            _id: accountId
        }, {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            role: req.body.role,
            status: req.body.status
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

//[PATCH] /api/v1/accounts/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const accountId = req.params.id;
        await Account.updateOne({
            _id: accountId
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

//[POST] /api/v1/accounts/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const account = await Account.findOne({
            email: email,
            deleted: false
        }).populate("role")
        if (!account) {
            res.status(400).json({
                code: 400,
                message: "Email không tồn tại!"
            });
            return;
        }
        if (!bcrypt.compareSync(password, account.password)) {
            res.status(400).json({
                code: 400,
                message: "Sai mật khẩu!"
            });
            return;
        }
        if (account.role.title === "Khách hàng") {
            res.status(400).json({
                code: 400,
                message: "Bạn không được đăng nhập!"
            });
            return;
        }
        const data = {
            id: account._id,
            fullName: account.fullName
        }
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })
        await Account.updateOne({
            _id: account._id,
        }, {
            $push: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        })
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 365*24*60*60*1000)
        });
        res.json({
            code: 200,
            message: "Đăng nhập thành công!",
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!"
        })
    }
}

//[POST] /api/v1/accounts/logout
module.exports.logout = async (req, res) => {
    try {
        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        await Account.updateOne({
            _id: req.user._id
        }, {
            $pull: {
                access_token: access_token,
                refresh_token: refresh_token
            }
        })
        res.clearCookie("refresh_token");
        res.json({
            code: 200,
            message: "Đăng xuất thành công"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!"
        })
    }
}

//[GET] /api/v1/accounts/detail
module.exports.detail = async (req, res) => {
    res.json({
        code: 200,
        data: req.user
    })
}