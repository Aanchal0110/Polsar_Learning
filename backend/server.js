require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")

const { UserController, UserModel } = require("./src/controller/userController");
const { postController, postModel } = require("./src/controller/postControlller");
const { resourceController, resourceModel} = require("./src/controller/resourceController");

const userRoute = require("./src/routes/userRoutes");
const postRoute = require("./src/routes/postRoutes");
const proxyRoute = require("./src/routes/proxy");
const resourceRoute = require("./src/routes/resourceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  try {
    // await UserModel.init();
    // await postModel.init();
    // await resourceModel.init();
      console.log("Database initialized.");
    } catch (err) {
      console.error("Failed to initialize DB:", err.message);
    }
})();
  
app.use("/auth", userRoute);
app.use("/post", postRoute);
app.use("/proxy", proxyRoute);
app.use("/resource", resourceRoute);
app.get("/", (req, res) => {
    res.send("Server is working...");
});

app.listen(PORT, () => {
    console.clear();
    console.log(`Server running at http://localhost:${PORT}`);
  });