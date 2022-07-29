import React from 'react'
import logo from '../../Assets/LOGO.svg';
import newpost from '../../Assets/Buttons/New post.svg'
import Bell from '../../Assets/Buttons/bell.svg'
import { Stack, Avatar, Badge, Tooltip, Zoom } from '@mui/material'
import './HomeHeader.css'

function HomeHeader() {
    return (
        <header className='User-Home-Header'>
                <img src={logo} className='User-Home-Logo' alt="logo" />
                <div className='User-Home-emptydiv'></div>
                <img src={newpost} className='User-Home-Newpost' alt="newpost" />
                <Tooltip 
                title="Notifications" 
                ransitionComponent={Zoom} 
                enterDelay={500} 
                leaveDelay={300}
                >
                    <Badge color="error" badgeContent={0}>
                        <img src={Bell} className='User-Home-Bell' alt="bell" />
                    </Badge>
                </Tooltip>
                <Stack direction={'row'} spacing = {2} >
                    <Tooltip 
                    TransitionComponent={Zoom} 
                    title="Profile"
                    enterDelay={500} 
                    leaveDelay={300}
                    >
                        <Avatar 
                            className='User-Home-Avatar'
                            src={'https://i.pravatar.cc/300'}
                            alt="Avatar"
                            sx={{ width: 56, height: 56, mr: 5 }}
                        />
                    </Tooltip>
                </Stack>
            </header>
    )
}

export default HomeHeader
