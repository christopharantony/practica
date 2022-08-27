import { Box } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../axiosInstance'
import Upcoming from './Upcoming';

function UserUpcoming() {
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState([])

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const getupcomingData = async() => {
        const { data } = await axios.get('api/interview/user/upcoming',config)
        console.log(data);
        setUpcoming(data.upcoming)
    }

    useEffect(() => {
        getupcomingData()
        // eslint-disable-next-line
    },[])

    const handleClose = () => {
        navigate('/home')
    }
    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box className="scrollbar-hidden" sx={{ overflow: 'scroll', height: 450, width: '100%' }}>
                {
                    upcoming?.map((data) => (
                        <Upcoming requestData={data} />
                    ))
                }
            </Box>
        </div>
    )
}

export default UserUpcoming
