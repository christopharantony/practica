import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import axios from '../../../axiosInstance'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllNotifications() {
    const navigate = useNavigate();
    const [notifications, setNoftifications] = useState([])

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const getNotificationData = async () => {
        try {
            const { data } = await axios.get('api/interview/user/notifications', config)
            setNoftifications(data.requests)
        } catch (error) {
            generateError("Something went wrong")
        }
    }

    useEffect(() => {
        getNotificationData()
        // eslint-disable-next-line
    }, [])

    const handleClose = () => {
        navigate('/home')
    }

    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box sx={{ height: 430 }} className="All-Request-list" >
                {
                    notifications?.map((data, index) => (
                        <Notification notificationData={data} key={index} />
                    ))
                }
            </Box>
        </div>
    )
}

export default AllNotifications
