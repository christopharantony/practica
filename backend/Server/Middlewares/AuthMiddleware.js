const User = require("../Models/userModel");
const Admin = require("../Models/adminModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.header("token");
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.json({ message:'Invalid Token',status: false })
            } else {
                const user = await User.findById(decodedToken.id);
                if (user) {
                    next();
                } else {
                    res.json({ message:"User Not Found", status: false })
                }
            }
        });
    } else {
        res.json({ message: "No token", status: false })
    }
}

module.exports.checkAdmin = (req, res, next) => {
    const token = req.header('adminToken')
    if (token) {
        jwt.verify(token,process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.json({ message:'Invalid Token',status: false })
            } else {
                const admin = await Admin.findById(decodedToken.id);
                if (admin) {
                    next();
                } else {
                    res.json({ message:"Admin Not Found", status: false })
                }
            }
        })
    }
}

// module.exports.checkInterviewer = (req, res, next) => {
//     const token = req.cookies.interviewerjwt;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//             if (err) {
//                 res.json({ status: false })
//                 next();
//             } else {
//                 const interviewer = await User.findById(decodedToken.id);
//                 if (interviewer) {
//                     res.json({ status: true, interviewer: interviewer.name })
//                 } else {
//                     res.json({ status: false })
//                     next();
//                 }
//             }
//         });
//     } else {
//         res.json({ status: false })
//         next();
//     }
// }












// module.exports.checkAdmin = (req, res, next) => {
//     const token = req.cookies.adminjwt;
//     if (!token) {
//         return res.json({ status: false });
//     }
//     try {
//         const data = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = data.id;
//         req.userRole = data.role;
//         return next();
//     } catch {
//         return res.json({ status: false });
//     }
// };

// module.exports.checkAdmin = (req,res,next) => {
//     const token = req.cookies.adminjwt
//     console.log('req.cookies', req.cookies)
//     console.log('token', token)
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 const admin = await Admin.findById(decodedToken.id);
//                 if (admin) {
//                     next();
//                 }
//             }
//         });
//     }
// }

// middleware for checking admin
// module.exports.checkAdmin = (req, res, next) => {
//     const token = req.cookies.adminjwt;
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
//             if (err) {
//                 res.json({ status: false })
//                 next();
//             } else {
//                 const admin = await Admin.findById(decodedToken.id);
//                 if (admin) {
//                     res.json({ status: true, admin: admin.name })
//                 } else {
//                     res.json({ status: false })
//                     next();
//                 }
//             }
//         });
//     }else{
//         res.json({status:false})
//         next();
//     }
// }