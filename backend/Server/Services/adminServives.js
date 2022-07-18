const Admindb = require('../Models/AdminModel')
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