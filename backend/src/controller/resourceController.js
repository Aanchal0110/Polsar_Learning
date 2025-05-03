const settings = require("../config/settings");
const MainModel = require("../models/MainModel");
const fs = require("fs").promises;
const path = require("path");

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
    const data = {
        UserID: req.body.UserID,
        Auth_Name: req.body.Auth_Name,
        Title: req.body.Title,
        Contain_Link: req.body.Contain_Link,
        Content_Type: req.body.Content_Type,
        Description: req.body.Description,
        Resource_Keyword: req.body.Resource_Keyword,
        UserName: req.body.UserName
    }
    // trans Id Auth_Name Contain_Path Contain_Type Images
    
    try {
        const User = await MainModel.Resource.add_Resource(data);
        console.log(User)
        // if (!User) res.status(300).json({ error: "No User Found" });
        res.status(200).json({data:User });
    } catch (err) {
        next(err);
    }
}

const uploadFile = async (req, res) => {
    console.log("i was called")
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  res.status(200).json({
    message: 'File uploaded successfully.',
      file: req.file.filename,
    filePath: req.file.path
  });
};

const uploadImages = async (req, res, next) => {
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
    res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/${req.file.path}`,
  });
}

const admin_resource = async (req, res, next) => {
    const { resource_id } = req.body;
    try { 
        const files = await fs.readdir("/resource/", { withFileTypes: true });
        const data = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        const data_1 = await fs.readFile(`/resource/${resource_id}/info.json`, "utf8");
        const data_2 = await JSON.parse(data_1);
    }
    catch (err) {
        next(err)
    }
}

const add_cover_page = async (req, res, next) => {
    const { path, var_1 } = req.body;
    console.log(req.body);
    try {
        const data = await MainModel.Resource.add_image(path, var_1);
        if (data) {
            res.status(200).json({ content: data });
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    create_Table,
    detele_Table,
    fetch_All_Resource,
    add_Resource,
    uploadFile,
    uploadImages,
    add_cover_page
}