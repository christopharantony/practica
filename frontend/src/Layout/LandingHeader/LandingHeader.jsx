import { useState } from 'react'
import logo from '../../Assets/LOGO.svg';
import { AnimatePresence } from 'framer-motion'
// import ButtonHead from '../../Components/Interfaces/ButtonHead/ButtonHead';
import LoginModal from '../../Components/Forms/LoginModal/LoginModal';
import SignupModal from '../../Components/Forms/SignupModal/SignupModal';
import './LandingHeader.css';

function LandingHeader() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const signupClose = () => setShowSignupModal(false);
    const signupOpen = () => setShowSignupModal(true);
    const loginClose = () => setShowLoginModal(false);
    const loginOpen = () => setShowLoginModal(true);
    return (
        <header className="Landing-header">
            <img src={logo} className="Landing-logo" alt="logo" />
            <div>
                <button className='Button-head' onClick={()=>{
                    showSignupModal ? signupClose() : signupOpen()
                }} > SIGN UP</button>
                <button className='Button-head' onClick={() => {
                    showLoginModal ? loginClose() : loginOpen()
                }} >LOG IN</button>
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                    >
                    {showLoginModal && <LoginModal handleClose={loginClose} />}
                    {showSignupModal && <SignupModal handleClose={signupClose} />}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default LandingHeader