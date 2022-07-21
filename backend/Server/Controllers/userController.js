const { isUserExist, createInterviewer, createInterviewee, userLogin } = require('../Services/userServices');
const jwt = require("jsonwebtoken")

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id,role) => {
    return jwt.sign({ id,role }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

module.exports.Signup = async (req, res) => {
    try {
        const { name, mobile, email, password, interviewer, domain, experience, company } = req.body;
        const exist = await isUserExist(email);
        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            })
        } else {
            if (interviewer) {
                const newInterviewer = await createInterviewer (
                    name,
                    mobile,
                    email,
                    password,
                    interviewer,
                    company,
                    experience,
                );
                const token = createToken(newInterviewer._id, 'interviewer');
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    message: "User created successfully",
                    user: newInterviewer._id,
                    created: true
                })
            } else {
                const newInterviewee = await createInterviewee (
                    name,
                    mobile,
                    email,
                    password,
                    domain,
                );
                const token = createToken(newInterviewee._id, 'user');
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    message: "User created successfully",
                    user: newInterviewee._id,
                    created: true
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userLogin(email, password);
        if (user) {
            if (user.interviewer) {
            const token = createToken(user._id, 'interviewer');
                res.cookie("interviewerjwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    message: "Interviewer logged in successfully",
                    user: user._id,
                    created: true
                })
            } else {
                const token = createToken(user._id, 'user');
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    message: "User logged in successfully",
                    user: user._id,
                    created: true
                })
            }
        }else{
            return res.json({
                error: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" }, error)
    }
}