const settings = require("../config/settings");
const MainModel = require("../models/MainModel")

const fetch_All_User = async (req, res, next) => {
    try {
        const User = await MainModel.UserModel.fetch_user();
        // if (!User) res.status(300).json({ error: "No User Found" });
        res.status(200).json(User);
    } catch (err) {
        next(err);
    }
}

const create_Table = async (req, res, next) => {
    try {
        const data = await MainModel.UserModel.create_table();
        res.status(200).json({ title: "User Table", Data: data });
    } catch (err) {
        next(err);
    }
}

const detele_Table = async (req, res, next) => {
    try {
        const data = await MainModel.UserModel.delete_table();
        res.status(200).json({ title: "User Table", Data: data });
    } catch (err) {
        next(err)
    }
}

const fetch_User = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        const User = await MainModel.UserModel.get_user(email);
        settings.trigger_Error(User)
        if (User && (User.Password == password) && password) {
            res.status(200).set('Content-Type', 'application/json').json({User});
        } else {

            res.status(300).json({ error: "no user found.." })
        }
    } catch (err) {
        next(err)
    }
}

const Add_User = async (req, res, next) => {
    const User = req.body;
    try {
        const  s = MainModel.UserModel.addUser(User);
        settings.trigger_Error(User)
        if (s) {
            res.status(200).json(User);
        } else {
            res.status(300).json({error:"User No Added..."})
        }
    } catch (err) {
        next(err)
    }
}

const Remove_User = async (req, res, next) => {
    const { Uid } = req.query;
    try { 
        const s = MainModel.UserModel.removeUser(Uid)
        settings.trigger_Error(Uid)
        if (s) {
            res.status(200).json({"uid":Uid});
        } else {
            res.status(300).json({error:"User No Deleted.."})
        }
    } catch (err) {
        next(err)
    }
}

const Verify_User = async (req, res, next) => {
    const { Email } = req.query;
    try {
        const s = MainModel.UserModel.verify_User(Email);
        if (s) {
            res.status(200).json({ Topic: "User TAble", Data: "s" });
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    fetch_User,
    fetch_All_User,
    Add_User,
    Remove_User,
    create_Table,
    detele_Table,
    Verify_User
}