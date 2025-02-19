const settings = require("../config/settings");
const AuthRoutes = require('./authRoutes');
const UserRoutes = require("./userRoutes");
const PostRoutes = require("./postRoutes");
const PageRoutes = require("./pagesRoutes");
const ResourceRoutes = require("./resourceRoutes");
const CareerRoutes = require("./careerRoutes");

module.exports = {
    AuthRoutes,
    UserRoutes,
    PostRoutes,
    PageRoutes,
    ResourceRoutes,
    CareerRoutes
}