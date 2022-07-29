const Admindb = require('../Models/AdminModel')
const Userdb = require('../Models/UserModel')
const bcrypt = require('bcrypt');

module.exports.adminLogin = async (email, password) => {
    const admin = await Admindb.findOne({ email });
    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if (auth) {
            return admin;
        }
        return false;
    }
    return false;
}

module.exports.allUserService = async () => {
    const users = await Userdb.find({interviewer: false}).select('-password -__v');
    return users;
}

module.exports.allInterviewersService = async () => {
    const users = await Userdb.find({interviewer: true}).select('-password -__v');
    return users;
}

module.exports.UserblockService = async (id,blocked) => {
    if (blocked) {
        const user = await Userdb.findByIdAndUpdate(id, { $set: { blocked: false } });
        return user;
    } else {
        const user = await Userdb.findByIdAndUpdate(id, { $set: { blocked: true } });
        return user;
    }
}