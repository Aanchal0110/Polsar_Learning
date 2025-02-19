const settings = require("../config/settings");
const MainModel = require("../models/MainModel");

const fetch_all_post_details = async (req, res, next) => {
    try {
        const post_details = await MainModel.PostModel.fetch_all_post_details();
        res.status(200).json(post_details)
    } catch (err) {
        settings.trigger_Error(err.message)
        next(err)
    }
}

const create_table = async (req, res, next) => {
    try {
        const created = await MainModel.PostModel.create_table();
        if (created) {
            res.status(200).json({ content: created });
        } else {
            res.status(300).json({error:"No created..."})
        }
    } catch(err) {
        next(err)
    }
}

const delete_table = async (req, res, next) => {
    try { 
        const deleted = await MainModel.PostModel.delete_table();
        if (deleted) {
            res.status(200).json({content:deleted})
        } else {
            res.status(300).json({error:"Not deleted the table Post..."})
        }
    } catch (err) {
        next(err)
    }
}

const insert_post = async (req, res, next) => {
    const PostInfo = req.body;
    try {
        const inserted = MainModel.PostModel.insert_data(PostInfo);
        if (inserted) {
            res.status(200).json({content:PostInfo})
        } else {
            res.status(300).json({error:"Not insert the post....."})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    fetch_all_post_details,
    create_table,
    delete_table,
    insert_post
}
