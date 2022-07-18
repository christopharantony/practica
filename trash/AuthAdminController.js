const jwt = require("jsonwebtoken");
const AdminModel = require("../backend/Server/Models/AdminModel");
const UserModel = require("../backend/Server/Models/UserModel");

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = {email:"", password:""};

    if (err.message === "Invalid email") {
        errors.email = " That email is not registered";
    }

    if (err.message === "Invalid password") {
        errors.password = " That password is not correct";
    }

    if (err.code === 11000) {
        errors.email = "Email already exists";
        return errors;
    }

    if (err.message.includes("Admin validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports.adminRegister = async (req, res, next) => {
    try {
        console.log('Admin Register',req.body);
        const {email, password} = req.body;
        const admin = await AdminModel.create({email, password});
        console.log('Admin :: ',admin);
        const token = createToken(admin._id);
        res.cookie("adminjwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge : maxAge*1000
        });
        res.status(201).json({admin: admin._id, created:true});
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({errors, created:false});
    }
};

module.exports.adminLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const admin = await AdminModel.login( email, password );
        const users = await UserModel.find().select("-password");
        console.log('Admin :: ',admin);
        const token = createToken(admin._id);

        res.cookie("adminjwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge : maxAge*1000
        });
        res.status(200).json({admin: admin._id, users, created:true});
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({errors, created:false});
    }
}