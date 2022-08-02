import { useState } from "react";
import { motion } from "framer-motion";
import BackdropLanding from "../BackdropLanding/BackdropLanding";
import CloseIcon from "@mui/icons-material/Close";
import {  } from "@mui/material";
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
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "3vh",
        opacity: 0,
    },
};

function ProfileEditModal({ handleClose }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const interviewer = user.interviewer;
    const [image, setImage] = useState(user.pic);
    const [values, setValues] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
    });

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit", values);
        try {
            if (
                values.email === "" ||
                values.password === "" ||
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
            } else if (values.password.length < 4) {
                generateError("Password must be atleast 4 characters");
            } else if (values.password.length > 20) {
                generateError("Password must be less than 20 characters");
            } else if (values.experience > 49) {
                generateError("Enter a valid Experience");
            } else {
                const { data } = await axios.post(
                    "api/signup",
                    {
                        ...values,
                        interviewer,
                    },
                    {
                        withCredentials: true,
                    }
                );
                if (data.error === "User already exists") {
                    generateError(data.error);
                } else if (data.created) {
                    localStorage.setItem("token", data.token);
                    handleClose();
                    return;
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
                <CloseIcon className="Close-button" onClick={handleClose} />
                <>
                    <h2 className="Signup-Heading">SIGNUP</h2>
                    <div className="Parent-Signup">
                        <form onSubmit={handleSubmit} className="UserSignup-Form">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile"
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => {
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
                                            placeholder="Company"
                                            onChange={(e) => {
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
                                            placeholder="Experience"
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    [e.target.name]: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                            <button className="Submit-Button" type="submit">
                                JOIN NOW
                            </button>
                        </form>
                    </div>
                </>
            </motion.div>
            <ToastContainer />
        </BackdropLanding>
    );
}

export default ProfileEditModal;

const Backdropstyle = {
    height: "700px",
};
