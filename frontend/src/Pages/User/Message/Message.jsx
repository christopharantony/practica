import HomeHeader from '../../../Layout/HomeHeader/HomeHeader';
import Leftsection from '../../../Components/Users/Leftsection/Leftsection';
import Messages from '../../../Components/Users/Chat/Chat';
import Chat from '../../../Components/Users/Chat/ChatBox';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Message() {
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
                    <Leftsection />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Messages />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Chat />
                </Grid>
            </Grid>
        </div>
    )
}

export default Message
