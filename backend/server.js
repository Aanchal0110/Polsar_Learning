const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const settings = require("./src/config/settings.js");
const MainRoutes = require("./src/routes/MainRoutes.js")
const cors = require("cors");
const MainMiddleware = require('./src/middleware/MainMiddleware.js');
const errorHandleMiddleware = require("./src/middleware/errorMiddleware.js");


if (settings.configs.debug) {
    console.clear();
}

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", MainRoutes.PageRoutes.router);
app.use("/post", MainRoutes.PostRoutes.router);
app.use("/auth", MainRoutes.UserRoutes.router);
app.use("/resource", MainRoutes.ResourceRoutes.router);
app.use("/career", MainRoutes.CareerRoutes.router);
app.get("*", (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html'))
})

// app.use(errorHandleMiddleware.handleError);
// app.use(errorHandleMiddleware.notFound);

app.listen(settings.configs.PORT, settings.configs.allowed_host[-1], () => console.log(`Server listening on port: ${settings.configs.PORT}`));