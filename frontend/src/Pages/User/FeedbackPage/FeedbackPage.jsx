import { Grid } from '@mui/material'
import React from 'react'
import Leftsection from '../../../Components/Users/Leftsection/Leftsection'
import MyFeedback from '../../../Components/Users/MyFeedback/MyFeedback'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader'

function FeedbackPage() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Leftsection />
                </Grid>
                <Grid item xs={12} md={9}>
                    <MyFeedback />
                </Grid>
            </Grid>
        </div>
    )
}

export default FeedbackPage
