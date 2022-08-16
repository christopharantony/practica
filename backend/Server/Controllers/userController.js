const { isUserExist, createInterviewer, createInterviewee, userLogin, profilePicChanger, updateUser, userByIdService, updatePasswordService, pushConnection } = require('../Services/userServices');
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
                return res.status(200).json({
                    message: "Interviewer logged in successfully",
                    created: true,
                    user,
                    token
                })
            } else {
                const token = createToken(user._id, 'user');
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

module.exports.UpdateProfileImage = async (req, res) => {
    try {
        const image = req.file.path;
        const userId = req.user._id;
        const user = await profilePicChanger(userId, image);
        return res.status(200).json({
            created: true,
            message: "Profile image updated successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports.UpdateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, mobile, email, interviewer, experience, company, domain } = req.body;
        if (interviewer) {
            await updateUser(
                userId,
                name,
                mobile,
                email,
                company,
                experience
            )
            const user = await userByIdService(userId);
            return res.status(200).json({
                created: true,
                message: "Interviewer updated successfully",
                user
            })
        } else {
            await updateUser(
                userId,
                name,
                mobile,
                email,
                domain
            )
            const user = await userByIdService(userId);
            return res.status(200).json({
                created: true,
                message: "User updated successfully",
                user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports.UpdatePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { oldPassword, newPassword } = req.body;
        const result = await updatePasswordService(userId, oldPassword, newPassword);
        console.log('res', result)
        if (!result) {
            return res.json({
                error: "Invalid credentials",
                created: false
            })
        } else if (result === 'Wrong password') {
            return res.json({
                error: "Old password is wrong !",
                created: false
            })
        } else if (result === 'Success') {
            return res.status(200).json({
                message: "Password updated successfully",
                created: true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

module.exports.UserConnect = async (req, res) => {
    const userId = req.user._id;
    const id = req.body.id;
    const val1 = JSON.stringify(userId);
    const val2 = JSON.stringify(id);
    if (val1 == val2) {
        return res.json({
            error: "You can't connect with yourself"
        })
    } else {
        const user = await userByIdService(userId);
        const isAlready = user.connections.includes(id);
        if (isAlready) {
            return res.json({
                error: "Already connected"
            })
        } else {
            const result = await pushConnection(userId, id);
            return res.status(200).json({
                message: "User connected successfully",
                created: true,
                result
            })
        }
    }
} 

module.exports.UserDetails = async (req, res) => {
    const userId = req.params.id;
    const user = await userByIdService(userId);
    return res.status(200).json(user);
}