// import React from 'react'
import { motion } from "framer-motion"
import BackdropLanding from "../BackdropLanding/BackdropLanding"
import './LoginModal.css'

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type:"spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "20vh",
        opacity: 0
}
}

function LoginModal({handleClose, text}) {
    return (
        <BackdropLanding onClick={handleClose}>
            <motion.div 
            drag
            onClick={(e)=>{e.stopPropagation()}}
            className="Login-modal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <p>{text}</p>
                <button className="Close-button" onClick={handleClose}>Close</button>
            </motion.div>
        </BackdropLanding>
    )
}

export default LoginModal

