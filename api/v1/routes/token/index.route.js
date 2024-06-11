const tokenRoutes = require("./refreshToken.route")

module.exports = (app) => {
    const versionToken = "/api/v1/token";
    app.use(versionToken + "/refreshToken", tokenRoutes);
}