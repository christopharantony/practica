import { Grid } from '@mui/material'
import React from 'react'
import AllNotifications from '../../../Components/Users/AllNotifications/AllNotifications'
import Leftsection from '../../../Components/Users/Leftsection/Leftsection'
import HomeHeader from '../../../Layout/HomeHeader/HomeHeader'

function UserNotificationgPage() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                        <Leftsection />
                </Grid>
                <Grid item xs={12} md={9}>
                    <AllNotifications />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserNotificationgPage
