const settings = require("../config/settings");
const MainModel = require("../models/MainModel");
const fs = require("fs").promises;
const path = require("path");

const search = async (req, res, next) => {
    const { q } = req.query;
    try {
        const data_1 = await MainModel.Resource.search(q);
        const data_2 = await MainModel.DomainExpert.search(q);
        const data_3 = await MainModel.PostModel.search(q);

        res.status(200).json({ data: [data_1, data_2, data_3] });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    search
}