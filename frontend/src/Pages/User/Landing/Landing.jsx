import React from 'react'
import { Link } from 'react-router-dom'
import LandingHeader from '../../../Layout/LandingHeader/LandingHeader';
import image from '../../../Assets/Images/Landing.png';
import './Landing.css';

function Landing() {
    return (
        <div className="Landing">
            <LandingHeader />
            <div className='Landing-Content'>
                <figcaption className='Landing-Figcaption'>
                    <h2>Let's Work Together and Explore the Opportunities.</h2>
                    <p className='Landing-Para'>
                        We have the largest collection of career collection and 10+
                        years of experienced Industrial Experts for interviewing and
                        Advising.We are sure to have the resource you are looking for.
                    </p>
                    <Link to='/about' className='Landing-About'>About Us</Link>
                </figcaption>
                <figure>
                    <img className='Landing-Image' src={image} alt="home" />
                </figure>
            </div>
        </div>
    )
}

export default Landing
