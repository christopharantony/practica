import { useState } from 'react'
import logo from '../../Assets/LOGO.svg';
import { AnimatePresence } from 'framer-motion';
import newpost from '../../Assets/Buttons/New post.svg'
import Bell from '../../Assets/Buttons/bell.svg'
import CreatePostModal from '../../Components/Forms/CreatePostModal/CreatePostModal'
import ProfileEditModal from '../../Components/Forms/ProfileEditModal/ProfileEditModal';
import { Stack, Avatar, Badge, Tooltip, Zoom, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material'
import './HomeHeader.css'

function HomeHeader() {
    const navigate = useNavigate();
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const createPostOpen = () => setShowCreatePostModal(true);
    const createPostClose = () => setShowCreatePostModal(false);
    const profileEditOpen = () => setShowProfileEditModal(true);
    const profileEditClose = () => setShowProfileEditModal(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const open = Boolean(anchorElNav);

    const handleNavAvatarClick = (event) => {
        setAnchorElNav(event.currentTarget);
    }

    const userLogout = ()=> {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <>
            <header className='User-Home-Header'>
                <img src={logo} className='User-Home-logo' alt="logo" />
                <div className='User-Home-emptydiv'></div>
                <img src={newpost} className='User-Home-Newpost' alt="newpost" onClick={() => {
                    showCreatePostModal ? createPostClose() : createPostOpen()
                }} />
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
                <Stack direction={'row'} spacing={2} >
                    <Tooltip
                        TransitionComponent={Zoom}
                        title="Profile"
                        enterDelay={500}
                        leaveDelay={300}

                    >
                        <Avatar
                            className='User-Home-Avatar'
                            src={user.pic}
                            // src={'https://i.pravatar.cc/300'}
                            alt="Avatar"
                            id='User-Nav-Avatar'
                            onClick={handleNavAvatarClick}
                            aria-controls={open ? 'profile-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{ width: 56, height: 56, mr: 5 }}
                        />
                    </Tooltip>
                </Stack>
                <Menu id="profile-menu" anchorEl={anchorElNav} open={open} MenuListProps={{
                    "aria-labelledby": "User-Nav-Avatar",
                }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    onClose={() => setAnchorElNav(null)}>
                    <MenuItem
                        onClick={() => {
                            setAnchorElNav(null);
                            showProfileEditModal ? profileEditClose() : profileEditOpen()
                        }}
                    >
                        <Avatar />Profile
                    </MenuItem>
                    <MenuItem 
                        onClick={userLogout}
                    >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </header>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {showCreatePostModal && <CreatePostModal handleClose={createPostClose} />}
                {showProfileEditModal && <ProfileEditModal handleClose={profileEditClose} />}
            </AnimatePresence>
        </>
    )
}

export default HomeHeader
