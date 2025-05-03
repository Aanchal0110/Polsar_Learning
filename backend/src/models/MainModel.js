const settings = require("../config/settings");
const AdminModel = require("./Admin");
const UserModel = require("./User");
const PostModel = require("./Post");
const CommentModel = require("./Comments");
const Resource = require("./Resource");
const CareerModel = require("./Career");
const DomainExpert = require("./DomainExpert")

module.exports = {
    AdminModel,
    UserModel,
    PostModel,
    CommentModel,
    Resource,
    CareerModel,
    DomainExpert
}