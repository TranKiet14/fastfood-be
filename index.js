const express = require('express');
const bodyParser = require("body-parser")
const database = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
database.connect();

const app = express()
const port = process.env.PORT;

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

//Routes Token Ver1
const routesTokenVer1 = require("./api/v1/routes/token/index.route");
routesTokenVer1(app);

// Routes Admin Ver1
const routesAdminVer1 = require("./api/v1/routes/admin/index.route");
routesAdminVer1(app);

// Routes Client Ver1
const routesClientVer1 = require("./api/v1/routes/client/index.route");
routesClientVer1(app);

app.get("/get", (req,res) => {
    res.send(req.cookies)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})