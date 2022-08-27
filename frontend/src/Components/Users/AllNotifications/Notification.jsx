import { CalendarToday, CheckCircleOutline, HighlightOff, Schedule } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Swal from "sweetalert2";
import React, { useEffect, useState } from 'react'
import axios from "../../../axiosInstance"
import { toast, ToastContainer } from 'react-toastify';

function Notification({ notificationData }) {
    const [userSubmit, setUserSubmit] = useState(false);
    const [userCancel, setUserCancel] = useState(false);

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const handleSubmit = async (id) => {
        try {
            const body = {
                requestId: id
            }
            await axios.put("api/interview/user/confirm",body,config)
            setUserSubmit(true)
            generateSuccess("Confirmed!")
        } catch (error) {
            generateError("Something went wrong!")
        }
    }

    const handleCancel = async (id) => {
        try {
            const body = {
                requestId: id
            };
            const { isConfirmed } = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel it!",
            })
            if (isConfirmed) {
                const { data } = await axios.put("api/interview/user/cancel", body, config)
                console.log('data', data)
                setUserCancel(true)
                generateSuccess("Cancelled!")
            }
        } catch (error) {
            generateError("Something went wrong!")
        }
    }

    useEffect(() => {
        console.log("=====",notificationData);
        setUserSubmit(notificationData.userConfirmed);
        setUserCancel(notificationData.userCancelled);
    }, [notificationData]);

    return (
        <>
            {(notificationData?.confirmed || notificationData?.cancelled) && (
                <Box
                    component={Paper}
                    width="85%"
                    height="auto"
                    sx={{ m: "25px auto", p: 2, borderRadius: "15px" }}
                >
                    <Box
                        sx={{
                            ml: 2,
                        }}
                    >
                        <Typography
                            fontSize="1.25rem"
                            fontWeight={600}
                            sx={{
                                borderBottom: "1px solid",
                                borderColor: "rgba(0, 0, 0, 0.38)",
                            }}
                        >
                            Request Notification
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 2, mt: 2 }}>
                        {notificationData.confirmed ? (
                            <Typography>
                                Interview is confirmed by{" "}
                                {notificationData.interviewerId.name}
                            </Typography>
                        ) : (
                            notificationData.cancelled && (
                                <Typography>
                                    Interview is cancelled by{" "}
                                    {notificationData.interviewerId.name}
                                </Typography>
                            )
                        )}
                        <Box sx={{ display: "flex" }}>
                            <CalendarToday sx={{ fontSize: 24, mt: 1.5 }} />
                            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                                {dayjs(notificationData.date).format("DD/MM/YYYY")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Schedule sx={{ fontSize: 25, mt: 1.8 }} />
                            <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                                {dayjs(notificationData.time).format("hh:mm a")}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                            {userCancel ? (
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: "15px" }}
                                    disabled
                                >
                                    <HighlightOff sx={{ fontSize: 25, mr: 0.7, color: '#ff3333' }}></HighlightOff>
                                    <Typography color='#ff3333' fontSize='1.2rem'>Cancelled</Typography>
                                </Button>
                            ) : userSubmit ? (
                                <Box
                                    variant="contained"
                                    sx={{ borderRadius: "15px", p: 1, display: 'flex' }}
                                >
                                    <CheckCircleOutline sx={{ fontSize: 25, mr: 0.7, color: 'green' }}></CheckCircleOutline>
                                    <Typography color='green' fontSize='1.2rem'>Confirmed</Typography>
                                </Box>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => handleCancel(notificationData._id)}
                                        variant="contained"
                                        color="error"
                                        sx={{ borderRadius: "15px" }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleSubmit(notificationData._id)}
                                        sx={{ ml: 2, mr: 2, borderRadius: "15px" }}
                                    >
                                        Confirm
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
            <ToastContainer />
        </>
    )
}

export default Notification
