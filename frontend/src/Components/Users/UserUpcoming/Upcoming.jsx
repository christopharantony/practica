import { CalendarToday, CurrencyRupee, Schedule, Videocam } from '@mui/icons-material'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

function Upcoming( { requestData } ) {
    return (
        <Box
            component={Paper}
            width="85%"
            height="auto"
            // bgcolor="secondary.main"
            sx={{ m: "25px auto", p: 2, borderRadius: "15px" }}
        >
            <Box sx={{ display: "flex" }}>
                <Avatar
                    src={requestData?.interviewerId?.profileImg}
                    sx={{ height: 65, width: 65, zIndex: 0 }}
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
                        <Typography fontSize="1.1rem" fontWeight={600}>
                            {requestData?.interviewerId?.name}
                        </Typography>
                    </Box>
                    <Box width="100%">
                        <Typography fontSize="0.8rem" sx={{ mb: 1 }}>
                            {requestData?.interviewerId?.about}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ml: 2, mt: 2 }}>
                <Typography>
                    Interview with {" "} {requestData?.interviewerId?.name} is scheduled as follows,
                </Typography>

                <Box sx={{ display: "flex" }}>
                    <CalendarToday sx={{ fontSize: 24, mt: 1.5 }} />
                    <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                        {dayjs(requestData.date).format("DD/MM/YYYY")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Schedule sx={{ fontSize: 25, mt: 1.8 }} />
                    <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                        {dayjs(requestData.time).format("hh:mm a")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Videocam sx={{ fontSize: 25, mt: 1.8 }} />
                    <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                        {requestData?.link}
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography fontSize="0.65rem" color='red' sx={{ mt: 1, ml: 0.4 }}>
                        *video call link available before 5 minutes of actual timing
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Upcoming
