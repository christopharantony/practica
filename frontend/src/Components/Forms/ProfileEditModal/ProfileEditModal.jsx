import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import BackdropLanding from "../BackdropLanding/BackdropLanding";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Avatar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../axiosInstance";
import "./ProfileEditModal.css";

const dropIn = {
    hidden: {
        y: "-50vh",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 20,
            stiffness: 200,
        },
    },
    exit: {
        y: ".1vh",
        opacity: 0,
    },
};

function ProfileEditModal({ handleClose }) {
    const isInitialMount = useRef(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const interviewer = user.interviewer;
    const [showSave, setShowSave] = useState({ display: 'none' });
    const [image, setImage] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [Passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const [values, setValues] = useState({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        company: user.company,
        experience: user.experience,
        domain: user.domain
    });

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right",
        });

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            changeImage(image);
        }
    }, [image]);

    const changeImage = async (image) => {
        const values = new FormData();
        values.append("image", image);
        try {
            const { data } = await axios.put("api/updateImage", values, {
                headers: {
                    "token": localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log("data", data);
            if (data.created) {
                generateSuccess("Image updated");
            } else if (data.error) {
                generateError(data.error.message);
            } else {
                generateError("Something went wrong");
            }
        } catch (err) {
            generateError(err.response.data.error);
        }
    }
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (Passwords.oldPassword === "" || Passwords.newPassword === "") {
                generateError("Enter old and new password");
                return;
            } else if (Passwords.newPassword.length < 4) {
                generateError("Password must be atleast 4 characters");
            } else if (Passwords.newPassword.length > 20) {
                generateError("Password must be less than 20 characters");
            } else {
                const { data } = await axios.put(
                    "api/updatePassword",
                    {
                    ...Passwords,
                    }, {
                    headers: {
                        "token": localStorage.getItem("token"),
                    }
                },{
                    withCredentials: true
                });
                if (data.created) {
                    generateSuccess("Password Changed");
                    setChangePassword(false);
                } else if (data.error){
                    generateError(data.error);
                }
                    
                // generateSuccess("Password updated");
            }
        } catch (error) {
            console.log(error.message);
            generateError("Something went wrong");
            generateError(error.response.data.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                values.email === "" ||
                values.name === "" ||
                values.mobile === ""
            ) {
                generateError("Please fill all fields");
                return;
            } else if (user.interviewer && !values.company) {
                generateError("Please Enter Company Name");
                return;
            } else if (values.name.length < 3) {
                generateError("Name must be atleast 3 characters");
            } else if (values.name.length > 20) {
                generateError("Name must be less than 20 characters");
            } else if (!values.name.match(/^[A-Za-z][A-Za-z ]*$/)) {
                generateError("Enter a valid name");
            } else if (values.mobile.match(/[^0-9]/g)) {
                generateError("Enter a valid mobile number");
            } else if (values.mobile.length !== 10) {
                generateError("Mobile must be 10 characters");
            } else if (
                !values.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
            ) {
                generateError("Enter a valid email");
            } else if (values.experience > 49) {
                generateError("Enter a valid Experience");
            } else {
                const { data } = await axios.put(
                    "api/profileEdit",
                    {
                        ...values,
                        interviewer,
                    }, {
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                },
                    {
                        withCredentials: true,
                    }
                );
                if (data.error) {
                    generateError("Something went wrong");
                } else if (data.created) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setShowSave({ display: 'none' })
                    generateSuccess("Saved");
                    return;
                } else {
                    generateError("Error")
                }
            }
        } catch (error) {
            console.log(error);
            generateError("Something went wrong");
            generateError(error.response.data.message);
        }
    };
    return (
        <BackdropLanding style={Backdropstyle} onClick={handleClose}>
            <motion.div
                // drag
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="ProfileEditModal bg-white"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <header className='ProfileEditModal-header'>
                    <Grid container spacing={3} >
                        <Grid item xs={10.5}>
                            <h2 className="CreatePost-Heading">My Profile</h2>
                        </Grid>
                        <Grid item xs={1}>
                            <CloseIcon className="CreatePost-Close-button" onClick={handleClose} />
                        </Grid>
                    </Grid>
                </header>
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <form onSubmit={handleSubmit} >
                            <div className="Parent-ProfileEditModal">
                                <div className="UserSignup-Form">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={values.name}
                                            onChange={(e) => {
                                                setShowSave({ display: 'block' });
                                                setValues({ ...values, [e.target.name]: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="mobile"
                                            value={values.mobile}
                                            placeholder="Mobile"
                                            onChange={(e) => {
                                                setShowSave({ display: 'block' });
                                                setValues({ ...values, [e.target.name]: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            placeholder="Email"
                                            onChange={(e) => {
                                                setShowSave({ display: 'block' });
                                                setValues({ ...values, [e.target.name]: e.target.value });
                                            }}
                                        />
                                    </div>
                                    {user.interviewer && (
                                        <>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={values.company}
                                                    placeholder="Company"
                                                    onChange={(e) => {
                                                        setShowSave({ display: 'block' });
                                                        setValues({
                                                            ...values,
                                                            [e.target.name]: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    name="experience"
                                                    value={values.experience}
                                                    placeholder="Experience"
                                                    onChange={(e) => {
                                                        setShowSave({ display: 'block' });
                                                        setValues({
                                                            ...values,
                                                            [e.target.name]: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {!user.interviewer && (
                                        <div>
                                            <input
                                                type="text"
                                                name="domain"
                                                value={values.domain}
                                                placeholder="Domain"
                                                onChange={(e) => {
                                                    setShowSave({ display: 'block' });
                                                    setValues({
                                                        ...values,
                                                        [e.target.name]: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    )}
                                    <button style={showSave} className="Profile-Save-Button" type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>

                        </form>
                    </Grid>
                    <Grid item xs={5}>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            id="ProfileEditImage"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}
                        />
                        <label htmlFor="ProfileEditImage">
                            <Avatar
                                src={image ? URL.createObjectURL(image) : user.pic}
                                alt="profile"
                                sx={{ width: "5rem", height: "5rem", cursor: "pointer", mt: "10%", ml: "10%" }}

                            />
                        </label>
                        {changePassword ?
                            <>
                            <form onSubmit={handlePasswordChange}>
                                <input
                                    type='password'
                                    name='oldPassword'
                                    placeholder='Old Password'
                                    style={{ marginTop: '10px' }}
                                    onChange={(e) => {
                                        setPasswords({...Passwords,oldPassword:e.target.value})
                                    }}
                                />
                                <input
                                    type='password'
                                    name='newPassword'
                                    placeholder='New Password'
                                    style={{ marginTop: '10px' }}
                                    onChange={(e) => {
                                        setPasswords({...Passwords,newPassword:e.target.value})
                                    }}
                                />
                                <Grid container>
                                    <Grid item xs={4.2}>
                                        <button
                                            className='Change-Password-Cancel-Button'
                                            onClick={() => {
                                                setChangePassword(false);
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <button
                                            className='Change-Password-Submit-Button'
                                            type='submit'
                                        >
                                            Submit
                                        </button>

                                    </Grid>

                                </Grid>
                                </form>
                            </>
                            :
                            <h2
                                className='Change-Password-Button'
                                onClick={() => {
                                    setChangePassword(true);
                                }}
                            >
                                Change Password
                            </h2>

                        }


                    </Grid>
                </Grid>
            </motion.div>
            <ToastContainer />
        </BackdropLanding>
    );
}

export default ProfileEditModal;

const Backdropstyle = {
    height: "700px",
};
