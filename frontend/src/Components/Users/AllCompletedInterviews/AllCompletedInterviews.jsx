import CloseIcon from "@mui/icons-material/Close";
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosInstance"
import MyInterviews from "./MyInterviews";

function AllCompletedInterviews() {
    const navigate = useNavigate()
    const [myInterviews, setMyInterviews] = useState([])

    const config = {
        headers: {
            token: localStorage.getItem('token')
        }
    }

    const getMyInterviews = async() => {
        const { data } = await axios.get('api/interview/user/myinterviews',config)
        setMyInterviews(data.interviews)
    }

    const handleClose = () => {
        navigate('/home')
    }

    useEffect(() => {
        getMyInterviews()
    },[])
    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box sx={{ height: 430 }} className="All-Request-list" >
                {
                    myInterviews?.map((data, index) => (
                        <MyInterviews Data={data} key={index} />
                    ))
                }
            </Box>
        </div>
    )
}

export default AllCompletedInterviews
