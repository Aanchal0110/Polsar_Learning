const settings = require("../config/settings");
const database = require("../config/db");
const moments = require("moment");

const query_for_resouce = {
    creation: `CREATE TABLE Resource (
        Trans_Id VARCHAR(100) PRIMARY KEY,
        User_Email TEXT NOT NULL,
        Contain_Path TEXT,
        Contain_Type VARCHAR(100) NOT NULL,
        Time_of_Upload TIME DEFAULT CURRENT_TIME);`,
    insert: `INSERT INTO Resource ( Trans_Id, User_Email,Contain_Type)
             VALUES (?, ?, ?);`,
    delete: "DELETE FROM Resource WHERE Trans_Id = ?;",
    fetch: `SELECT * FROM Resource WHERE Email = ?;`,
    all: "SELECT * FROM Resource;",
    delete_table: `DROP TABLE Resource;`,
}

function create_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.creation, [],(err, row) => {
            if(err) reject(err);
            resolve(row)
       })
   })
}

function delete_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.delete_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function get_all() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.all, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function add_Resource(data) {
    var Uid = moments().format("HHmmssDDMMYYYY");

    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.insert, [
            data.UserID + Uid, data.UserEmail, data.BookName, 
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    create_table,
    delete_table,
    get_all,
    add_Resource
}