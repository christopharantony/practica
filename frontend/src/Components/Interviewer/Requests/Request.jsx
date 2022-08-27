import { CalendarToday, CheckCircleOutline, Email, HighlightOff, Phone, Schedule, Videocam } from "@mui/icons-material"
import { Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "../../../axiosInstance";
import Swal from "sweetalert2";
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Request({ requestData }) {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");
    const [submit, setSubmit] = useState(false);
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        setSubmit(requestData.confirmed);
        setCancel(requestData.cancelled);
    }, [requestData]);

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const generateSuccess = (success) =>
        toast.success(success, {
            position: "bottom-right"
        })

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const handleTimeChange = (time) => {
        setTime(time)
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = async (id) => {
        console.log(id);
        if (id && time && date && link) {
            try {
            const body = {
                time: time,
                date: date,
                link: link,
                requestId: id
            }
            console.log(body);
                await axios.put("api/interview/schedule", body, config)
                generateSuccess("Submitted")
                setSubmit(!submit)
            } catch (error) {
                generateError("Something went wrong")
            }
        } else {
            console.log("error");
            generateError("Please fill all fields")
        }
    }

    const handleCancel = async (requestId) => {
        try {
            const body = {
                requestId
            }
            await axios.put("api/interview/cancel", body, config)

        } catch (error) {
            generateError("Something went wrong")
        }
    }



    const handleCancelStatus = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel it!",
            })
            if (result.isConfirmed) {
                await handleCancel(id)
                Swal.fire("Cancelled!", "Your request has been cancelled.", "success")
            }
        } catch (error) {
            generateError("Something went wrong")
            setCancel(false)
        }
    }


    return (
        <Box
            component={Paper}
            width="85%"
            height="auto"
            sx={{ m: "1rem auto", p: 2, borderRadius: "10px" }}
        >
            <Box sx={{ display: "flex" }}>
                <Avatar
                    src={requestData.userId.pic}
                    sx={{ height: 55, width: 55, zIndex: 0 }}
                ></Avatar>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        ml: 2,
                        justifyContent: "center",
                        borderBottom: "1px solid",
                        borderColor: "rgba(0, 0, 0, 0.38)",
                    }}
                >
                    <Box width="100%">
                        <Typography fontSize="1rem">{requestData.userId.name}</Typography>
                    </Box>
                    <Box width="100%">
                        <Typography fontSize="0.8rem" sx={{ mb: 1 }}>
                            {requestData.userId.domain}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: 8.5, mt: 2 }}>
                <Typography>{requestData?.request}</Typography>
                <Box sx={{ display: "flex" }}>
                    <Email sx={{ fontSize: 25, mt: 1.2 }} />
                    <Typography fontSize="1.1rem" sx={{ mt: 1, ml: 1.5 }}>
                        {requestData.userId.email}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Phone sx={{ fontSize: 25, mt: 1.2 }} />
                    <Typography fontSize="1.1rem" sx={{ mt: 1, ml: 1.5 }}>
                        {requestData.userId.mobile}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <CalendarToday sx={{ fontSize: 25, mt: 1.5 }} />
                    {requestData.confirmed ? (
                        <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                            {dayjs(requestData.date).format("MMM, DD YYYY")}
                        </Typography>
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                                label="Date"
                                inputFormat="dd/MM/yyyy"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        component={Paper}
                                        size="small"
                                        sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )}
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Schedule sx={{ fontSize: 25, mt: 1.8 }} />
                    {requestData.confirmed ? (
                        <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                            {dayjs(requestData.time).format("hh:mm a")}
                        </Typography>
                    ) : (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Time"
                                value={time}
                                onChange={handleTimeChange}
                                renderInput={(params) => (
                                    <TextField
                                        component={Paper}
                                        size="small"
                                        sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    )}
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Videocam sx={{ fontSize: 25, mt: 1.8 }} />
                    {requestData.confirmed ? (
                        <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                            {requestData.link}
                        </Typography>
                    ) : (
                        <TextField
                            size="small"
                            onChange={(e) => handleLinkChange(e)}
                            component={Paper}
                            sx={{ mt: 1, ml: 1.5, width: 190, borderRadius: "5px" }}
                        ></TextField>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    {cancel ? (
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "15px" }}
                            disabled
                        >
                            <HighlightOff sx={{ fontSize: 25, mr: 0.7, color: '#ff3333' }}></HighlightOff>
                            <Typography color='#ff3333' fontSize='1.2rem'>Cancelled</Typography>
                        </Button>
                    ) : submit ? (
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
                                onClick={() => handleCancelStatus(requestData._id)}
                                variant="contained"
                                color="error"
                                sx={{ borderRadius: "15px" }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleSubmit(requestData._id)}
                                sx={{ ml: 2, mr: 2, borderRadius: "15px" }}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Request;
