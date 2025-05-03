const settings = require("../config/settings");
const AuthController = require("./authController");
const UserController = require("./userController");
const PostController = require("./postController");
const CommentController = require("./commentsController");
const PageController = require("./pageController");
const ResourceController = require("./resourceController");
const CareerController = require("./careerController");
const DomainExpertController = require("./domainExpert");
const SearchController = require("./searchController");

module.exports = {
    AuthController,
    UserController,
    PostController,
    CommentController,
    PageController,
    ResourceController,
    CareerController,
    DomainExpertController,
    SearchController
}