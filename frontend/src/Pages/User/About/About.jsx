import React from 'react'
import LandingHeader from '../../../Layout/LandingHeader/LandingHeader'
import image1 from '../../../Assets/Images/About-Question.png'
import image2 from '../../../Assets/Images/About-Interview.png'
import image3 from '../../../Assets/Images/About-Workchat.png'
import './About.css'

function About() {
    return (
        <div className="About">
            <LandingHeader />
            <div className='About-Content'>
                <div className="About-Section1">
                    <figcaption className='About-Figcaption'>
                        <h2>You have any doubts about interviews</h2>
                        <p className='About-Para'>
                        Not anymore, Because we are providing. We have quality and experienced 
                        Industrial experts. They will give proper advise for your career path.
                        </p>
                    </figcaption>
                    <figure>
                        <img className='About-Image' src={image1} alt="home" />
                    </figure>
                </div>
                <div className="About-Section2">
                    <figure>
                        <img className='About-Image' src={image2} alt="home" />
                    </figure>
                    <figcaption className='About-Figcaption'>
                        <h2>Everything is practice</h2>
                        <p className='About-Para'>
                        You will get more chances to attend mock interviews. This much practice with 
                        experts let you pro on interviews. You can communicate with Industrial experts.
                        </p>
                    </figcaption>
                </div>
                <div className="About-Section3">
                    <figcaption className='About-Figcaption'>
                        <h2>Let’s connect with each other.</h2>
                        <p className='About-Para'>
                        You can connect with other developers. And share your ideas with everyone. 
                        This will help to grow your network and communication skills. 
                        </p>
                    </figcaption>
                    <figure>
                        <img className='About-Image' src={image3} alt="home" />
                    </figure>
                </div>
            </div>
            <footer className='Footer'>
                <p>©2022 Pratica - All Rights Reserved.</p>
                <p>Terms & Conditions  |  Privacy Policy</p>
            </footer>
        </div>
    )
}

export default About