const settings = require("../config/settings");
const database = require("../config/db");

query_for_Comments = {
    create_table: ` CREATE TABLE Post (
        trans_id INT PRIMARY KEY,
        post_id CHAR(15) NOT NULL,
        Post_Or_Comment CHAR(2) NOT NULL,
        User_id VARCHAR(15) NOT NULL,
        Text_Location VARCHAR(100) NOT NULL,
        point_down_id CHAR(15) NOT NULL
    )`,
    insert: `INSERT INTO Post (trans_id, post_id, Post_Or_Comment, User_id, Text_Location, point_down_id)
             VALUES (?, ?, ?, ?, ?);`,
    delete: `DELETE FROM Post WHERE post_id = ?;`,
    fetch: `SELECT * FROM Post WHERE trans_id = ?;`,
    all: `SELECT * FROM Post;`
}

function create_table() { }
function fetch_comment() { }
function insert_comment() { }
function delete_comment() { }
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