const { adminLogin,allUserService, allInterviewersService, UserblockService } = require('../Services/adminServives')
const { userByIdService } = require('../Services/userServices')
const { createToken, maxAge } = require('../Utils/generateToken')
// const AdminModel = require('../Models/AdminModel');
// const jwt = require("jsonwebtoken")

// const maxAge = 3 * 24 * 60 * 60;

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: maxAge,
//     });
// };

module.exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminLogin(email, password);
        if (admin) {
            const token = createToken(admin._id, 'admin');
            res.cookie("adminjwt", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            });
            res.status(200).json({ admin: admin._id, created: true,token });
        } else {
            res.json({
                errors: "Invalid email or password",
                created: false
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ errors: error, created: false });
    }
}

module.exports.allUsers = async (req, res) => {
    try {
        const users = await allUserService()
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({ errors: error, created: false });
    }
}

module.exports.allInterviewers = async (req, res) => {
    try {
        const users = await allInterviewersService()
        res.json({users, created: true});
    } catch (error) {
        console.log(error);
        res.json({ errors: error, created: false });
    }
}

module.exports.blockUser = async (req, res) => {
    try {
        const { id } = req.query;
        const User = await userByIdService(id);
        console.log(id);
        const user = await UserblockService(id,User.blocked);
        res.json({user, created: true});
    } catch (error) {
        console.log(error);
        res.json({ errors: error, created: false });
    }
}

module.exports.adminLogout = (req, res) => {
    res.clearCookie("adminjwt")
    res.json({ loggedOut: true })
}




// module.exports.adminRegister = async (req, res, next) => {
//     try {
//         const {email, password} = req.body;
//         const admin = await AdminModel.create({email, password});
//         console.log('Admin :: ',admin);

//         res.status(201).json({admin: admin._id, created:true});
//     } catch (error) {
//         console.log(error);
//         res.json({error, created:false});
//     }
// };