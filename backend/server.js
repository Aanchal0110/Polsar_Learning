const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const settings = require("./src/config/settings.js");
const MainRoutes = require("./src/routes/MainRoutes.js")
const cors = require("cors");
const MainMiddleware = require('./src/middleware/MainMiddleware.js');
const errorHandleMiddleware = require("./src/middleware/errorMiddleware.js");
const MainController = require("./src/controller/searchController.js");

// 805a73edd74c4f5cb9ce192c52031e32


if (settings.configs.debug) {
    console.clear();
}

const app = express()

app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/resource/uplaod_pdf', express.static(path.join(__dirname, 'uploads')));
app.use('/resource/upload_images', express.static('uploads'));
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'cleint/frontend/dist')));

app.use("/", MainRoutes.PageRoutes.router);
app.use("/post", MainRoutes.PostRoutes.router);
app.use("/auth", MainRoutes.UserRoutes.router);
app.use("/resource", MainRoutes.ResourceRoutes.router, );
app.use("/career", MainRoutes.CareerRoutes.router);
app.use("/domainExpert", MainRoutes.DomainExpertRoutes.router);
app.get("/search", MainController.search);
app.get("/clear", (req, res) => {
    console.clear();
    res.send({done:"done"})
})
// app.get("*", (req, res) => {
//     res.setHeader('Content-Type', 'application/javascript');
//     res.sendFile(path.join(__dirname, 'cleint/frontend/dist', 'index.html'))
// })

// app.use(errorHandleMiddleware.handleError);
// app.use(errorHandleMiddleware.notFound);

app.listen(settings.configs.PORT, settings.configs.allowed_host[-1], () => console.log(`Server listening on port: ${settings.configs.PORT}`));