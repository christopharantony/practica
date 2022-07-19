// import React from 'react'
import { motion } from "framer-motion"

function BackdropLanding({ children, onClick }) {
    return (
        <div>
            <motion.div
                className="Backdrop-landing"
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default BackdropLanding
