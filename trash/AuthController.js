const jwt = require("jsonwebtoken");
const UserModel = require("../backend/Server/Models/UserModel");

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = {email:"", mobile:"", password:"", name:""};

    if(err.message === " User validation failed: name: Name is required"){
        errors.name = "Name is required";
    }

    if(err.message.includes("Mobile is required")){
        errors.mobile = "Phone Number is required";
    }

    if (err.message === "Invalid email") {
        errors.email = " That email is not registered";
    }

    if (err.message === "Invalid password") {
        errors.password = " That password is not correct";
    }

    if (err.message.includes('E11000 duplicate key error collection: jwt.users index: mobile_1 dup')) {
        errors.mobile = "Number already registered";
    }

    if (err.message.includes('E11000 duplicate key error collection: jwt.users index: email_1 dup')) {
        errors.email = "Email already exists";
        return errors;
    }

    if (err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const register = async (req, res, next) => {
    try {
        const {name, mobile, email, password, domain} = req.body;
        console.log('req.body :: ',req.body);
        const user = await UserModel.create({name, mobile, email, password, domain});
        console.log('User :: ',user);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge : maxAge*1000
        });
        res.status(201).json({user: user._id, created:true});
    } catch (error) {
        console.log('>>',error.message,'<<');
        const errors = handleErrors(error);
        res.json({errors, created:false});
    }
};

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.login( email, password );
        console.log('User :: ',user);
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge : maxAge*1000
        });
        res.status(201).json({user: user._id, created:true});
    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.json({errors, created:false});
    }
}