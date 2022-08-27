import { Grid } from '@mui/material'
import React from 'react'
import InterLeft from '../../../Components/Interviewer/InterLeft/InterLeft'
import InterUpcoming from '../../../Components/Interviewer/InterUpcoming/InterUpcoming'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader'

function InterviewerUpcomingPage() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <InterLeft />
                </Grid>
                <Grid item xs={12} md={9}>
                    <InterUpcoming />
                </Grid>
            </Grid>
        </div>
    )
}

export default InterviewerUpcomingPage
