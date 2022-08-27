import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InterLeft from '../../../Components/Interviewer/InterLeft/InterLeft';
import Requests from '../../../Components/Interviewer/Requests/AllRequests'

function InterviewRequestPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token && user) {
            navigate('/')
        }
    })
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <InterLeft />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Requests />
                </Grid>
            </Grid>
        </div>
    )
}

export default InterviewRequestPage
