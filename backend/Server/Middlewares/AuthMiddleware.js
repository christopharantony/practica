const User = require("../Models/UserModel");
const Admin = require("../Models/AdminModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                res.json({ status: false })
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                if (user) {
                    res.json({ status: true, user: user.name })
                } else {
                    res.json({ status: false })
                    next();
                }
            }
        });
    }else{
        res.json({status:false})
        next();
    }
}

module.exports.checkAdmin = (req, res, next) => {
    const token = req.cookies.adminjwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                res.json({ status: false })
                next();
            } else {
                const admin = await Admin.findById(decodedToken.id);
                const users = await User.find().select('-password');
                if (admin) {
                    res.json({ status: true, admin: admin.email, users })
                } else {
                    res.json({ status: false })
                    next();
                }
            }
        });
    }else{
        res.json({status:false})
        next();
    }
}