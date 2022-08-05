// import React from 'react'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import Leftsection from '../../../Components/Users/Leftsection/Leftsection';
import Posts from '../../../Components/Users/Posts/Posts';
import Chat from '../../../Components/Users/Chat/ChatBox';
import { Grid,Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token && user){
            navigate('/')
        }})
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Leftsection />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Posts />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Chat />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home