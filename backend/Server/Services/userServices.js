const Userdb = require('../Models/userModel');
const bcrypt = require('bcrypt');

module.exports.isUserExist = async (email,mobile) => {
    try {
        const user = await Userdb.findOne({ $or: [{email},  {mobile}] })
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.userByIdService = async (id) => {
    try {
        const user = await Userdb.findById(id);
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports.createInterviewer = async (
    name,
    mobile,
    email,
    password,
    interviewer,
    company,
    experience) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await Userdb.create({
            name,
            mobile,
            email,
            password: hashPassword,
            interviewer,
            company,
            experience
        })
        return user;
    }
    catch (error) {
        console.log('=>>',error.message,'+++++')
    }
}

module.exports.createInterviewee = async (
    name,
    mobile,
    email,
    password,
    interviewer,
    domain) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await Userdb.create({
            name,
            mobile,
            email,
            password: hashPassword,
            interviewer,
            domain
        })
        return user;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.userLogin = async (email, password) => {
    try {
        const user = await Userdb.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}