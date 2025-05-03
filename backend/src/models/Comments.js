const settings = require("../config/settings");
const database = require("../config/db");
const moment = require("moment");
var count = 0;

query_for_Comments = {
    create_table: ` CREATE TABLE Comment (
        trans_id INT PRIMARY KEY,
        post_id CHAR(15) NOT NULL,
        User_id VARCHAR(15) NOT NULL,
        Comments TEXT NOT NULL,
        Created_At DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    insert: `INSERT INTO Comment (trans_id, post_id,User_id, Comments)
             VALUES (?, ?, ?, ?);`,
    delete: `DELETE FROM Comment WHERE post_id = ?;`,
    fetch: `SELECT * FROM Comment WHERE trans_id = ?;`,
    all: `SELECT * FROM Comment;`,
    delete_table: `DROP TABLE IF EXISTS Comment;`,
    fetch_by_post: `SELECT * FROM Comment WHERE post_id = ?;`
}

function create_table() { 
    return new Promise((resolve, reject) => {
            database.db.all(query_for_Comments.create_table, [], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
}
function fetch_comment(post_id) {
    return new Promise((resolve, reject) => {
            database.db.all(query_for_Comments.fetch_by_post, [post_id], (err, rows) => {
                if (err) reject(err)
                resolve(rows)
            })
        })
 }
function insert_comment(PostInfo) { 

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var post_id = moment().format("HHmmssDDMMYYYY");
    post_id = post_id + characters.at(count) + characters.at(count - 1) + characters.at(count - 2) + characters.at(count - 3) + characters.at(count - 4);
    

    return new Promise((resolve, reject) => {
            database.db.all(query_for_Post.insert, [
                post_id, PostInfo.post_id, PostInfo.User_id, PostInfo.Comment 
            ], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
}
function delete_comment(post_id) { 
    return new Promise((resolve, reject) => {
            database.db.all(query_for_Comments.delete, [post_id], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
}
function get_comment() { }

function fetch_all_comments() { 
    return new Promise((resolve, reject) => {
        database.db.all(query_for_Comments.all, [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

module.exports = {
    query_for_Comments,
    create_table,
    fetch_comment,
    insert_comment,
    delete_comment,
    get_comment,
    fetch_all_comments,
}