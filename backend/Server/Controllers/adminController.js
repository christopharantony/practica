const { adminLogin } = require('../Services/adminServives')
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

module.exports.adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await adminLogin(email, password);
        if(admin){
        const token = createToken(admin._id);
        res.cookie("adminjwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        });
        res.status(200).json({ admin: admin._id, created: true });
    } else {
        res.json({
            errors: "Invalid email or password",
            created: false
        })
    }
    } catch (error) {
        console.log(error);
        res.json({ errors:error , created: false });
    }
}