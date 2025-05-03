const settings = require("../config/settings");
const MainModel = require("../models/MainModel");

const create_table = async (req, res, next) => {
    try {
        const response = await MainModel.DomainExpert.create_table();
        if (response) {
            res.status(200).json({title:"Career_table", data:response})
        }
     } catch (err) {
        next(err)
    }
}

const delete_table = async (req, res, next) => {
    try {
        const data = await MainModel.DomainExpert.delete_table();
        if (data) {
            res.status(200).json({ data: data })
        } else {
            res.status(400).json({error:"not done"})
        }
    } catch (err) {
        next(err)
    }
}

const add_cards = async (req, res, next) => {
    const data = {
        User_Name:req.body.User_Name,
        ExpertEmail:req.body.ExpertEmail,
        Description:req.body.Description,
        Expert_Type:req.body.Expert_Type
    }

    console.log(data)
    try {
        const response = await MainModel.DomainExpert.insert(data);
        if (response) {
            res.status(200).json(response);
        } 
     } catch (err) {
        next(err)
    }
}

const fetch = async (req, res, next) => {
    const { type } = req.body;
    try {
        const data = await MainModel.DomainExpert.fetch(type);
        if (data) {
            res.status(200).json({data:data})
        }
    } catch (err) {
        next(err)
    }
}

const fetch_all = async (req, res, next) => {
    try {
        const data = await MainModel.DomainExpert.fetch_all();
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

const add_images = async (req, res, next) => {
    console.log(req.body)
    try {
        const data = await MainModel.DomainExpert.add_cover_Image(req.body.card_id, req.body.path);
        if (data) { res.status(200).json({ data: data }) }
        else{
            res.status(400).json({ error: "error" })
            }
    } catch (err) {
        next(err)
    }
}

const uploadImages = async (req, res, next) => {
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
    res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/${req.file.path}`,
  });
}

module.exports = {
    create_table,
    add_cards,
    fetch,
    fetch_all,
    delete_table,
    add_images,
    uploadImages
}