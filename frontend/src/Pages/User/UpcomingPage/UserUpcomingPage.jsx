import { Grid } from '@mui/material'
import React from 'react'
import Leftsection from '../../../Components/Users/Leftsection/Leftsection'
import UserUpcoming from '../../../Components/Users/UserUpcoming/UserUpcoming'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader'

function UserUpcomingPage() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Leftsection />
                </Grid>
                <Grid item xs={12} md={9}>
                    <UserUpcoming />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserUpcomingPage
