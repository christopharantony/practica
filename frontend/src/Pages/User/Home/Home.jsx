import React from 'react'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import Leftsection from '../../../Components/Users/Leftsection/Leftsection';
import Posts from '../../../Components/Users/Posts/Posts';
import { Grid,Box } from '@mui/material';
import './Home.css';

function Home() {
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
                    <Box bgcolor='success.light' mt={6} h={12} p={2} >
                        Messages
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home