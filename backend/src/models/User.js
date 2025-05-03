const settings = require("../config/settings");
const database = require("../config/db");
const moments = require("moment");

const query_for_User = {
    creation: `CREATE TABLE User (
        Uid VARCHAR(15) PRIMARY KEY,
        UserName VARCHAR(100) NOT NULL,
        TimeOfSignIn TIME DEFAULT CURRENT_TIME,
        DateofSignIn DATE DEFAULT CURRENT_DATE,
        Email TEXT NOT NULL UNIQUE,
        Password VARCHAR(50) NOT NULL,
        Occupation VARCHAR(100),
        Image_Url VARCHAR(255)  DEFAULT "",
        Verified VHAR(1) DEFAULT "N",
        About_YourSelf TEXT);`,
    insert: `INSERT INTO User ( Uid, UserName, Email, Password, Occupation)
             VALUES (?, ?, ?, ?, ?);`,
    delete: "DELETE FROM User WHERE Uid = ?;",
    fetch: `SELECT * FROM User WHERE Email = ?;`,
    all: "SELECT * FROM User;",
    delete_table: `DROP TABLE User`,
    verify_User: `UPDATE User SET Verified = "Y" WHERE Email = ?;`,
    set_image_url: `UDPATE User SET Image_Url = ? WHERE Email = ?;`,
    set_about_yourself:`UPADTE user SET About_YourSelf = ? WHERE Email = ?;`
}

function insert_user(database, data) {
    database.run(query_for_User.insert, [data.Uid, data.Username, data.FirstName,  data.Email, data.Password, data.Occupation], (err) => {
        if (settings.configs.debug) {
            if (err) {
                console.log("Not inserted....", err.message);
            } else {
                console.log("Inserted successfully...:", data)
            }
        }
    })
}

function delete_user(database, Uid) {
    database.run(query_for_User.delete, [Uid], (err) => {
        if (settings.configs.debug) {
            if (err) {
                console.log("No deleted...", err.message);
            } else {
                console.log("Deleted...", Uid);
            }
        }
    })
}

function create_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.creation, [],(err, row) => {
            if(err) reject(err);
            resolve(row)
       })
   })
}

function delete_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.delete_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function get_user(Email) {
    return new Promise((resolve, reject) => {
        database.db.get(query_for_User.fetch, [Email], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function fetch_user() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.all, [], (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        })
    })
}

function addUser(UserInfo) {
    var count = 0;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var Uid = moments().format("HHmmssDDMMYYYY");
    Uid = Uid + characters[count];
    count++;
    if (count > characters.length) {
        count = 0;
    }
    
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.insert, [
            Uid, UserInfo.UserName,
            UserInfo.Email, UserInfo.Password,
            UserInfo.Occupation
        ], (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        })
    })
}

function removeUser(Uid) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.delete, [Uid], (err, rows) => {
            if (err) reject(rows)
            resolve(rows)
        })
    })
}

function verify_User(email) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.verify_User, [email], (err, row) => {
            if (err) reject(row)
            resolve(row)
        })
    })
}

function set_image(email, url) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.set_image_url, [url, email], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function set_about_yourself(email, text) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_User.set_about_yourself, [text, email], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    query_for_User,
    insert_user,
    delete_user,
    create_table,
    get_user,
    fetch_user,
    addUser,
    removeUser,
    delete_table,
    verify_User,
    set_image,
    set_about_yourself
}