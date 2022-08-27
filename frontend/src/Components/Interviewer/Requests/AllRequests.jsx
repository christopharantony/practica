import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import axios from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Request from "./Request";
import "./AllRequests.css"

function AllRequests() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/home");
    }

    const generateError = (error) =>
    toast.error(error, {
        position: "bottom-right"
    })

    
    const config = {
        headers: {
            token: localStorage.getItem("token"),
        },
    };

    const getRequests = async () => {
        try {
            const {data} = await axios.get("api/interview/requests", config)
            setRequests(data.requests)
        } catch (error) {
            generateError("Something went wrong")
        }
    }

    useEffect(() => {
        getRequests()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="All-Request bg-white">
                <CloseIcon className="Close-button" onClick={ handleClose } />
                    <Box sx={{ height: 430 }} className="All-Request-list" >
                        {
                            requests?.map((data,index) => (
                                    <Request requestData={data} key={index} />
                            ))
                        }
                    </Box>
            </div>
    )
}

export default AllRequests
