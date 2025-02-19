const settings = require("../config/settings");
const MainModel = require("../models/MainModel");

const fetch_all_comments = async (req, res, next) =>  {
    try {
        const all_comments = await MainModel.CommentModel.fetch_all_comments();
        res.status(200).json(all_comments);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    fetch_all_comments,
}