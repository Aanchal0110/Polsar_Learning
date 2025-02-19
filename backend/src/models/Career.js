const settings = require("../config/settings");
const database = require("../config/db");
const moments = require("moment");

const query_for_career = {
    creation: `CREATE TABLE Career (
        Trans_Id VARCHAR(100) PRIMARY KEY,
        Organizer_Email TEXT NOT NULL,
        Career_Type TEXT,
        Career_Opportunity VARCHAR(100) NOT NULL,
        Time_of_Upload TIME DEFAULT CURRENT_TIME,
        Discription TEXT);`,
    insert: `INSERT INTO Career ( Trans_Id, Organizer_Email,Career_Opportunity, Discription)
             VALUES (?, ?, ?, ?);`,
    delete: "DELETE FROM Career WHERE Trans_Id = ?;",
    fetch: `SELECT * FROM Career WHERE Organizer_Email = ?;`,
    all: "SELECT * FROM Career;",
    delete_table: `DROP TABLE Career;`,
}

function create_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_career.creation, [],(err, row) => {
            if(err) reject(err);
            resolve(row)
       })
   })
}

function delete_table() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_career.delete_table, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function fetch_all() {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_career.all, [], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function add_intership(data) {
    var Uid = moments().format("HHmmssDDMMYYYY");

    return new Promise((resolve, reject) => {
        database.db.all(query_for_career.insert, [
            data.UserID + Uid, data.Organizser_Email, data.Career_Oppo,data.Discription 
        ], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

function remove_intership(data) {
    return new Promise((resolve, reject) => {
        database.db.all(query_for_career.delete, [data], (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

module.exports = {
    create_table,
    delete_table,
    fetch_all,
    add_intership,
    remove_intership
}