const settings = require("../config/settings");
const MainModel = require("../models/MainModel");

const create_Table = async (req, res, next) => {
    try {
        const data = await MainModel.Resource.create_table();
        res.status(200).json({ title: "Resouce Table", Data: data });
    } catch (err) {
        next(err);
    }
}

const detele_Table = async (req, res, next) => {
    try {
        const data = await MainModel.Resource.delete_table();
        res.status(200).json({ title: "Resouce Table", Data: data });
    } catch (err) {
        next(err)
    }
}

const fetch_All_Resource = async (req, res, next) => {
    try {
        const User = await MainModel.Resource.get_all();
        // if (!User) res.status(300).json({ error: "No User Found" });
        res.status(200).json(User);
    } catch (err) {
        next(err);
    }
}

const add_Resource = async (req, res, next) => {
    const data = req.body;
    console.log(data)
    try {
        const User = await MainModel.Resource.add_Resource(data);
        // if (!User) res.status(300).json({ error: "No User Found" });
        res.status(200).json({ title: "Resouce Table" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create_Table,
    detele_Table,
    fetch_All_Resource,
    add_Resource
}