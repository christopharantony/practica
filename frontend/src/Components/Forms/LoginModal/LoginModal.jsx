// import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion"
import BackdropLanding from "../BackdropLanding/BackdropLanding"
import image from '../../../Assets/Images/Login-User.png'
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../axiosInstance'
import './LoginModal.css'

const dropIn = {
    hidden: {
        y: "-50vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "3vh",
        opacity: 0
    }
}

function LoginModal({ handleClose }) {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', values)
        try {
            if (values.email === "" || values.password === "") {
                generateError("Please fill all fields")
                return;
            }
            const { data } = await axios.post('api/login', {
                ...values
            }, {
                withCredentials: true
            })
            if (data.error) {
                generateError("Invalid Email or Password")
            } else {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <BackdropLanding style={Backdropstyle} onClick={handleClose}>
            <motion.div
                // drag
                onClick={(e) => { e.stopPropagation() }}
                className="Login-modal gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <CloseIcon className="Close-button" onClick={handleClose} />
                <>
                    <h2 className="Login-Heading">LOGIN</h2>
                    <div className="Parent-Login">
                        <figure>
                            <img className="Login-Image" src={image} alt="Login" />
                        </figure>
                        {/* <div className='container'> */}
                        <form onSubmit={handleSubmit} className="UserLogin-Form" >
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    }}
                                />
                            </div>
                            <button className="Submit-Button" type="submit">Login</button>
                        </form>
                    </div>
                </>
            </motion.div>
            <ToastContainer />
        </BackdropLanding>
    )
}

export default LoginModal

const Backdropstyle = {
    height: "700px"
}
