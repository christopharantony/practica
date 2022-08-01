const { isUserExist, createInterviewer, createInterviewee, userLogin } = require('../Services/userServices');
const { createToken, maxAge } = require('../Utils/generateToken');

module.exports.Signup = async (req, res) => {
    try {
        const { name, mobile, email, password, interviewer, domain, experience, company } = req.body;
        const exist = await isUserExist(email, mobile);
        if (exist) {
            return res.json({
                error: "User already exists",
                created: false
            })
        } else {
            if (interviewer) {
                const newInterviewer = await createInterviewer(
                    name,
                    mobile,
                    email,
                    password,
                    interviewer,
                    company,
                    experience,
                )
                const token = createToken(newInterviewer._id, 'interviewer');
                res.cookie("jwt", token, {
                    withCredentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });
                return res.status(200).json({
                    message: "Interviewer created successfully",
                    user: newInterviewer,
                    created: true,
                    token
                })
            } else {
                const newInterviewee = await createInterviewee(
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
                    user: newInterviewee,
                    created: true,
                    token
                })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userLogin(email, password);
        if (user) {
            if (user.interviewer) {
                const token = createToken(user._id, 'interviewer');
                // res.cookie("interviewerjwt", token, {
                //     withCredentials: true,
                //     httpOnly: false,
                //     maxAge: maxAge * 1000
                // });
                return res.status(200).json({
                    message: "Interviewer logged in successfully",
                    created: true,
                    user, 
                    token
                })
            } else {
                const token = createToken(user._id, 'user');
                // res.cookie("jwt", token, {
                //     withCredentials: true,
                //     httpOnly: false,
                //     maxAge: maxAge * 1000
                // });
                return res.status(200).json({
                    message: "User logged in successfully",
                    created: true,
                    user,
                    token
                })
            }
        } else {
            return res.json({
                error: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" }, error)
    }
}