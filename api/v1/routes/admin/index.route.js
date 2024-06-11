const foodRoutes = require("./food.route");
const comboRoutes = require("./combo.route")
const foodCategoryRoutes = require("./food-category.route")
const accountRoutes = require("./account.route")
const rolesRoutes = require("./role.route")
const middleware = require("../../middlewares/admin/auth.middleware")
module.exports = (app) => {
    const versionAdmin = "/api/v1/admin";
    app.use(versionAdmin + "/foods", middleware.requireAuth, foodRoutes);
    app.use(versionAdmin + "/combos", middleware.requireAuth, comboRoutes);
    app.use(versionAdmin + "/food-category", middleware.requireAuth, foodCategoryRoutes);
    app.use(versionAdmin + "/accounts", accountRoutes);
    app.use(versionAdmin + "/roles", middleware.requireAuth, rolesRoutes);
};