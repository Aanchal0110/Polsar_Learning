const settings = require("../config/settings");
const database = require("../config/db");
const moments = require("moment");

const query_for_resouce = {
    creation: `CREATE TABLE Resource (
        Trans_Id VARCHAR(100) PRIMARY KEY,
        Auth_Name TEXT NOT NULL,
        Title TEXT NOT NULL,
        Contain_Link TEXT,
        Contain_Type VARCHAR(100) NOT NULL,
        Time_of_Upload TIME DEFAULT CURRENT_TIME,
        Images TEXT,
        Description TEXT,
        User_Name EMAIL,
        Resource_Keyword TEXT);`,
    insert: `INSERT INTO Resource ( Trans_Id, Auth_Name, Title,Contain_Link,Contain_Type, Description, User_Name, Resource_Keyword)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *;`,
    delete: "DELETE FROM Resource WHERE Trans_Id = ?;",
    fetch: `SELECT * FROM Resource WHERE Email = ?;`,
    all: "SELECT * FROM Resource;",
    delete_table: `DROP TABLE Resource;`,
    fetch_by_Contain: `SELECT * FROM Resource WHERE Contain_Type = ?;`,
    add_image: `UPDATE Resource SET Images = ? WHERE Trans_Id = ?;`,
    search: `SELECT * FROM Resource WHERE title LIKE ? OR Auth_Name LIKE ?;`
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
            data.UserID + Uid,
            data.Auth_Name,
            data.Title,
            data.Contain_Link,
            data.Content_Type,
            data.Description,
            data.Resource_Keyword,
            data.UserName
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function add_image(path, Trans_Id) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.add_image, [
            path, Trans_Id
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function search(like) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_resouce.search, [like, like], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    create_table,
    delete_table,
    get_all,
    add_Resource,
    add_image,
    query_for_resouce,
    search
}