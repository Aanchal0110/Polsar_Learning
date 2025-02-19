const settings = require("../config/settings");
const MainModel = require("../models/MainModel")

const create_table = async (req, res, next) => {
    try {
        const response = await MainModel.CareerModel.create_table();
        if (response) {
            res.status(200).json({title:"Career_table", data:response})
        }
     } catch (err) {
        next(err)
    }
}

const delete_table = async (req, res, next) => {
    try {
        const response = await MainModel.CareerModel.delete_table();
        if (response) {
            res.status(200).json({title:"Career_table", data:response})
        }
     } catch (err) {
        next(err)
    }
}

const fetch_all = async (req, res, next) => {
    try {
        const response = await MainModel.CareerModel.fetch_all();
        if (response) {
            res.status(200).json(response);
        } 
     } catch (err) {
        next(err)
    }
}

const add_intership = async (req, res, next) => {
    const data = req.body;
    console.log(data)
    try {
        const response = await MainModel.CareerModel.add_intership(data);
        if (response) {
            res.status(200).json(response);
        } 
     } catch (err) {
        next(err)
    }
}

const remove_intership = async(req, res, next) => {
    const {data} = req.body;
    try {
        const response = await MainModel.CareerModel.remove_intership(data);
        if (response) {
            res.status(200).json(response);
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    create_table,
    delete_table,
    fetch_all,
    add_intership,
    remove_intership
}