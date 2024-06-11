const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Client = require("../../models/client.model")

//[POST] /api/v1/client/accounts/register
module.exports.register = async (req, res) => {
    try {
        const existEmail = await Client.findOne({
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
        const infoClient = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
            avatar: req.body.avatar,
            status: "active"
        }
        const record = new Client(infoClient);
        await record.save();
        const data = {
            id: record._id,
            fullName: record.fullName
        }
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })
        await Client.updateOne({
            _id: record._id
        }, {
            $push: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        })
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công!",
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: "Lỗi!!"
        })
        // console.log(error)
    }
}

//[POST] /api/v1/client/accounts/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const account = await Client.findOne({
            email: email,
            deleted: false
        })
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
        const data = {
            id: account._id,
            fullName: account.fullName
        }
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })
        await Client.updateOne({
            _id: account._id,
        }, {
            $push: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        })
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

//[PATCH] /api/v1/accounts/edit
module.exports.edit = async (req, res) => { }

//[POST] /api/v1/client/accounts/logout
module.exports.logout = async (req, res) => { }