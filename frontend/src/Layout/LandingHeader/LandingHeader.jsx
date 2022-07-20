import { useState } from 'react'
import logo from '../../Assets/LOGO.svg';
import { AnimatePresence } from 'framer-motion'
// import ButtonHead from '../../Components/Interfaces/ButtonHead/ButtonHead';
import LoginModal from '../../Components/Forms/LoginModal/LoginModal';
import './LandingHeader.css';

function LandingHeader() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const close = () => setShowLoginModal(false);
    const open = () => setShowLoginModal(true);
    return (
        <header className="Landing-header">
            <img src={logo} className="Landing-logo" alt="logo" />
            <div>
                <button className='Button-head' > SIGN UP</button>
                <button className='Button-head' onClick={() => {
                    showLoginModal ? close() : open()
                }} >LOG IN</button>
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                    >
                    {showLoginModal && <LoginModal handleClose={close} />}
                </AnimatePresence>
                {/* <ButtonHead action="SIGN UP" route="/signup" />
            <ButtonHead action="LOG IN" route="/login" /> */}
            </div>
        </header>
    )
}

export default LandingHeader