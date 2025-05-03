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

const add_comment = async (req, res, next) => {
    const { post_id, user_id, comment } = req.body;
    try {
        const added = await MainModel.CommentModel.insert_comment({ post_id, user_id, comment })
        if (added) {
            res.status(200).json({content:added, data:"added successfully"})
        }
    } catch (err) {
        next(err)
    }
}

const create_table = async (req, res, next) => {
    try {
        const created = await MainModel.CommentModel.create_table();
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

const delete_comment = async (req, res, next) => {
    try { 
        const deleted = await MainModel.CommentModel.delete_comment(req.body.post_id);
        if (deleted) {
            res.status(200).json({content:deleted})
        } else {
            res.status(300).json({error:"Not deleted the table Post..."})
        }
    } catch (err) {
        next(err)
    }
}

const fetch_by_post = async (req, res, next) => {
    const { post_id } = req.body;
    try {   
        const data = await MainModel.CommentModel.fetch_by_post(post_id);
        if (data) {
            res.status(200).json({ Data: data });
        } else {
            res.status(300).json({error:"Not insert the post....."})
        }
    } catch (err) {

    }
}

module.exports = {
    fetch_all_comments,
    add_comment,
    create_table,
    delete_comment,
    delete_table,
    fetch_by_post
}