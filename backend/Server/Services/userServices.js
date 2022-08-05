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
        const user = await Userdb.findById(id).select('-password');
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
        const user = await Userdb.findOne({ email }).select('-password');
        const data = await Userdb.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, data.password);
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

module.exports.profilePicChanger = async (id, image) => {
    try {
        const user = await Userdb.findByIdAndUpdate(id, {
            pic:image
        }).select('-password');
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateUser = async (id,name,mobile,email,domain) => {
    try {
        const user = await Userdb.findByIdAndUpdate(id, {
            name,
            mobile,
            email,
            domain
        }).select('-password');
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports.updatePasswordService = async (id,Oldpass,Newpass) => {
    try {
        const user = await Userdb.findById(id);
        if (user) {
            const isMatch = await bcrypt.compare(Oldpass, user.password);
            if (isMatch) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(Newpass, salt);
                await Userdb.findByIdAndUpdate(id, {
                    password: hashPassword
                })
                return 'Success';
            } else {
                return 'Wrong password';
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.pushConnection = async (id,connection) => {
    try {
        const user = await Userdb.updateOne(
            {
                _id: id
            },{
                $push:{
                    connections:connection
                }
        });
        return user;
    } catch (error) {
        console.log(error)
    }
}