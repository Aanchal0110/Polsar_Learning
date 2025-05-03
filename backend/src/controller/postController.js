const settings = require("../config/settings");
const MainModel = require("../models/MainModel");
const fs = require("fs").promises;
const moment = require("moment");
var count = 0;

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

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var post_id = moment().format("HHmmssDDMMYYYY");
    post_id = post_id + characters.at(count) + characters.at(count - 1) + characters.at(count - 2) + characters.at(count - 3) + characters.at(count - 4);
    count++;

    TextLocation = ''
    if (PostInfo.post_or_comment == "post") {
        TextLocation = `./src/models/database/posts/${PostInfo.Uid}/post/${post_id}.txt`;
    } else if (PostInfo.post_or_comment == "comment") {
        TextLocation = `./src/models/database/posts/${PostInfo.Uid}/comments/${post_id}.txt`;
    } else {
        TextLocation = '';
    }
    // console.log(TextLocation);
    if (TextLocation != '') {
        await fs.mkdir(`./src/models/database/posts/${PostInfo.Uid}/post/`, { recursive: true });
        await fs.writeFile(TextLocation, PostInfo.data, (err) => {
            if (err) settings.trigger_Error("Not able to insert data in file...");
            else {
                settings.trigger_Error("File successfully created...")
            }
        })
        
    }

    data = {
        content: PostInfo.data,
        User_id: PostInfo.Uid,
        title: PostInfo.title,
        status: "complete",
        post_or_comment: "post",
        post_id: post_id,
        TextLocation: TextLocation,
        User_Name:PostInfo.UserName
    }
    try {
        const inserted = await MainModel.PostModel.insert_data(data);
        const post_info = await MainModel.PostModel.fecth_single_post(post_id);
        if (inserted) {
            // console.log(inserted);
            res.status(200).json({content:post_info})
        } else {
            res.status(300).json({error:"Not insert the post....."})
        }
    } catch (err) {
        next(err)
    }
}

const fetch_single_post = async (req, res, next) => {
    const data = req.body;
    try {

        const response = await MainModel.PostModel.fecth_single_post(data.post_id);
        console.log(response)
        const content = await fs.readFile(response[0].Text_Location, "utf8", (err, data) => {
            if (err) {
                console.log(err);
                return;
            } 
            // console.log(data);
        })
        // console.log(content)
        res.status(200).json({ data: response[0], content: content });
    } catch (err) {
        next(err)
    }
}

const add_cover_page = async (req, res, next) => {
    const { post_id, path } = req.body;
    console.log(req.body)
    try {
        const data = await MainModel.PostModel.add_cover_page(post_id, path);
        if (data) {
            res.status(200).json({done:data})
        } else {
            res.status(300).json({error:"notfound"})
        }
    } catch (err) {
        // console.log(err)
        next(err)
    }
}
const uploadImages = async (req, res, next) => {
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/${req.file.path}`,
  });
}

module.exports = {
    fetch_all_post_details,
    create_table,
    delete_table,
    insert_post,
    fetch_single_post,
    add_cover_page,
    uploadImages
}
