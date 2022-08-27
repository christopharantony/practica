import { CalendarToday, Preview, Schedule } from "@mui/icons-material"
import { Box, Paper, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

function MyInterviews({ Data }) {
    const navigate = useNavigate();
    console.log('file',Data.feedback);
    const handleClickFeedback = () => {
        navigate("/feedback", { state: { file: Data.feedback } } )
    }
    return (
        <>
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
                        Interview Details
                    </Typography>
                </Box>
                <Box sx={{ ml: 2, mt: 2 }}>
                    <Box sx={{ display: "flex" }}>
                        <CalendarToday sx={{ fontSize: 24, mt: 1.5 }} />
                        <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                            {dayjs(Data.date).format("DD/MM/YYYY")}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Schedule sx={{ fontSize: 25, mt: 1.8 }} />
                        <Typography fontSize="1.1rem" sx={{ mt: 1.5, ml: 1.5 }}>
                            {dayjs(Data.time).format("hh:mm a")}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <Preview sx={{ fontSize: 26, mt: 1.8 }} />
                        <Typography
                            onClick={handleClickFeedback}
                            fontSize="1.1rem"
                            sx={{ mt: 1.5, ml: 1.5, color: "blue", cursor: "pointer" }}
                        >
                            Feedback notes
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography>
                            Your Interview with {Data.interviewerId.name} is completed
                            Successfully on {dayjs(Data.date).format("MMM DD, YYYY")}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MyInterviews
