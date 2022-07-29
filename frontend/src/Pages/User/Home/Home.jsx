import React from 'react'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import Leftsection from '../../../Components/Users/Leftsection/Leftsection';
import './Home.css';

function Home() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Leftsection />
        </div>
    )
}

export default Home