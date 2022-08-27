import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import Leftsection from '../../../Components/Users/Leftsection/Leftsection';
import Posts from '../../../Components/Users/Posts/MyPosts';
import Chat from '../../../Components/Users/Chat/ChatBox';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Home/Home.css';
import InterLeft from '../../../Components/Interviewer/InterLeft/InterLeft';
function MyPostsPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token && user){
            navigate('/')
        }})
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    { user?.interviewer ? (
                        <InterLeft />
                        ) : (
                        <Leftsection />
                    )}
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

export default MyPostsPage;
