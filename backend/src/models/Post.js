const settings = require("../config/settings");
const database = require("../config/db");
const moment = require("moment");
const fs = require('fs').promises;
var count = 0;

const query_for_Post = {
    create_table: ` CREATE TABLE Post (
        post_id CHAR(20) PRIMARY KEY,
        User_id VARCHAR(15) NOT NULL,
        User_Name VARCHAR(255) NOT NULL,
        Text_Location VARCHAR(100) NOT NULL,
        Title VARCHAR(255) NOT NULL,
        Created_At DATETIME DEFAULT CURRENT_TIMESTAMP,
        Updated_At DATETIME DEFAULT CURRENT_TIMESTAMP,
        Status VARCHAR(30)
    );`,
    insert: `INSERT INTO Post (post_id, User_id, User_Name, Text_Location, Title, Status)
             VALUES (?, ?, ?, ?, ?, ?);`,
    delete: `DELETE FROM Post WHERE post_id = ?;`,
    fetch: `SELECT * FROM Post WHERE post_id = ?;`,
    all: `SELECT * FROM Post;`,
    delete_table:`DROP TABLE IF EXISTS Post;`
};

const query_for_Comment = {
    create_table: `CREATE TABLE Comments(
        blog_post_id CHAR(20) NOT NULL,
        comment_id CHAR(20) PRIMARY KEY,
        author_id VARCHAR(15) NOT NULL,
        parent_comment_id VARCHAR(20),
        content VARCHAR(100) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        Updated_At DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    insert: `INSERT INTO Comments (blog_post_id, comment_id, author_id, parent_comment_id, content)
            VALUES (? , ?, ?, ?, ?)`,
    delete: `DELETE FROM Comments WHERE comment_id  = ?;`,
    fetch: `SELECT * FROM Comments WHERE comment_id = ?;`,
    all: `SELECT * FROM Comments;`,
    delete_table:`DROP TABLE IF EXISTS Comments;`,
}

function create_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_Post.create_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function fetch_all_post_details() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_Post.all, [], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function delete_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_Post.delete_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function insert_data(PostInfo) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var post_id = moment().format("HHmmssDDMMYYYY");
    post_id = post_id + characters.at(count) + characters.at(count - 1) + characters.at(count - 2) + characters.at(count - 3) + characters.at(count - 4);

    // get the file locations
    TextLocation = ''
    if (PostInfo.post_or_comment == "post") {
        TextLocation = `./database/posts/${PostInfo.User_id}/post/${post_id}.txt`;
    } else if (PostInfo.post_or_comment == "comment") {
        TextLocation = `./database/posts/${PostInfo.User_id}/comments/${post_id}.txt`;
    } else {
        TextLocation = '';
    }

    // create a file using the post id
    if (TextLocation != '') {
        // fs.writeFile(TextLocation, PostInfo.content, (err) => {
        //     if (err) settings.trigger_Error("Not able to insert data in file...");
        //     else {
        //         settings.trigger_Error("File successfully created...")
        //     }
        // })
        
    }
    

    return new Promise((resolve, reject) => {
        database.db.all(query_for_Post.insert, [
            PostInfo.post_id , PostInfo.User_id, PostInfo.User_Name ,PostInfo.TextLocation, PostInfo.title, PostInfo.status
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

async function wirtePostFile(TextLocation, content) {
    try {
        await fs.writeFile(TextLocation, content, (err) => {
            if (err) settings.trigger_Error("Not able to insert data in file...");
            else {
                settings.trigger_Error("File successfully created...")
            }
        })
    } catch (err) {
        return err
    }
}

function fecth_single_post(post_id) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_Post.fetch, [post_id], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    query_for_Post,
    create_table,
    fetch_all_post_details,
    delete_table,
    insert_data,
    fecth_single_post,
}