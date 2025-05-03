const settings = require("../config/settings");
const MainModel = require("../models/MainModel");
const uploadImage = require("../middleware/imageUpload");
const { generateOTP, verifyOTP } = require("../utils/otpService");
const sendOTPEmail = require("../config/mailer");

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

const upload_image = async (req, res, next) => {
    if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/${req.file.path}`,
  });
}

const generate_otp = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({error:"Email is requied"})
    }
    const otp = generateOTP(email);
    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
}

const verify_otp = async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });
    const isValid = verifyOTP(email, otp);
    if (isValid) {
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid or expired OTP" });
  }
}



module.exports = {
    fetch_User,
    fetch_All_User,
    Add_User,
    Remove_User,
    create_Table,
    detele_Table,
    Verify_User,
    upload_image,
    generate_otp,
    verify_otp,
}