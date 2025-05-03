const settings = require("../config/settings");
const database = require("../config/db");
const moment = require("moment");
const { resolve } = require("path");
const fs = require('fs').promises;
var count = 0;

const query_for_DomainExpert = {
    create_table: ` CREATE TABLE DomainExpert (
        card_id CHAR(40) PRIMARY KEY,
        User_Name VARCHAR(255) NOT NULL,
        ExpertEmail EMAIL NOT NULL,
        Description TEXT,
        Expert_Type VARCHAR(40),
        Image TEXT);`,
    insert: `INSERT INTO DomainExpert (card_id, User_Name, ExpertEmail, Description, Expert_Type)
             VALUES (?, ?, ?, ?, ?)  RETURNING *;`,
    delete: `DELETE FROM Post WHERE post_id = ?;`,
    fetch: `SELECT * FROM Post WHERE ExpertEmail = ?;`,
    all: `SELECT * FROM DomainExpert;`,
    delete_table: `DROP TABLE IF EXISTS DomainExpert;`,
    update_cover_page: `UPDATE DomainExpert SET Image = ? WHERE card_id = ?;`,
    search: `SELECT * FROM DomainExpert  WHERE User_Name LIKE ? OR ExpertEmail LIKE ? OR Expert_Type LIKE ?;`
};

function create_table() {
    return new Promise((resolve, reject) => {
            database.db.all(query_for_DomainExpert.create_table, [], (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
}

function insert(data) {

    var card_id = moment().format("YYYYMMDDHHmmss");

    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.insert, [
            card_id,
            data.User_Name,
            data.ExpertEmail,
            data.Description,
            data.Expert_Type
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function add_cover_Image(card_id, path) {
    console.log(path, card_id)
    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.update_cover_page, [path, card_id], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function fetch(type) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.fetch, [type], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function fetch_all() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.all, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function delete_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.delete_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function search(like) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_DomainExpert.search, [like, like, like], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    create_table,
    insert,
    add_cover_Image,
    fetch,
    fetch_all,
    delete_table,
    query_for_DomainExpert,
    search
}