const foodRoutes = require("./food.route");
const foodCategoryRoutes = require("./food-category");
const comboRoutes = require("./combo.route")
const clientRoutes = require("./client.route")

module.exports = (app) => {
    const versionClient = "/api/v1/client";
    app.use(versionClient + "/foods", foodRoutes)
    app.use(versionClient + "/food-category", foodCategoryRoutes)
    app.use(versionClient + "/combos", comboRoutes)
    app.use(versionClient + "/accounts", clientRoutes)
};