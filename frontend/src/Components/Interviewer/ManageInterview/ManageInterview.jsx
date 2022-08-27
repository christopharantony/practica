import { CheckCircle, Pending, RateReview } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Input, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../axiosInstance";
function ManageInterview() {
    const [request, setRequest] = useState([]);
    const [view, setView] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const pageItems = 5;
    const pageCount = Math.ceil(request.length / pageItems);
    const navigate = useNavigate();

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    useEffect(() => {
        setView(
            request.slice((page - 1) * pageItems, (page - 1) * pageItems + pageItems)
        );
        // eslint-disable-next-line
    }, [request]);

    useEffect(() => {
        setView(
            request.slice((page - 1) * pageItems, (page - 1) * pageItems + pageItems)
        );
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (!token && user) {
            navigate("/");
        } else {
            getRequests();
        }
        // eslint-disable-next-line
    }, [])

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const generateSuccess = (success) => {
        toast.success(success, {
            position: "bottom-right"
        })
    }

    const getRequests = async () => {
        try {
            const { data } = await axios.get("api/interview/requests", config);
            setRequest(data.requests);
        } catch (error) {
            generateError("Something went wrong");
        }
    }

    const handleClose = () => {
        navigate("/home");
    }

    const handleStatusChange = async (e, id) => {
        try {
            setStatus(e.target.value);
            const body = {
                status: e.target.value
            }
            await axios.put(`api/interview/interviewer/status/${id}`, body, config)
            getRequests();
            generateSuccess("Status updated");
        } catch (error) {
            generateError("Something went wrong");
        }
    }

    const handleFeedback = async (e, id) => {
        try {
            const file = e.target.files[0];
            let values = new FormData();
            values.append("feedback", file);
            await axios.put(`api/interview/interviewer/feedback/${id}`, values, config)
            getRequests();
        } catch (error) {
            generateError("Something went wrong");
        }
    }

    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box sx={{ height: 430 }} className="All-Request-list" >
                <TableContainer
                    className="scrollbar-hidden"
                    component={Paper}
                    style={{
                        width: "95%",
                        margin: "20px auto",
                        height: 450,
                        overflow: "scroll",
                    }}
                >
                    <Table sx={{ width: 1011 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#2666a9" }}>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Phone No.</TableCell>
                                <TableCell align="center">Domain</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {view.map((data, index) => (
                                <TableRow
                                    key={data._id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ width: 40 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: "0.9rem", width: 130 }}
                                    >
                                        {data.userId.name}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: "0.9rem", width: 95 }}
                                    >
                                        {data.userId.mobile}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: "0.9rem", width: 130 }}
                                    >
                                        {data.userId.domain ? data.userId.domain : "N/A"}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: "0.9rem", width: 100 }}
                                    >
                                        {dayjs(data.date).format("MMM DD YYYY")}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: "0.9rem", width: 100 }}
                                    >
                                        {dayjs(data.time).format("hh:mm a")}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ minWidth: 100 }}>
                                            {data?.status === "Cancelled" ? (
                                                <Typography textAlign='center' fontSize="1.1rem" color="error">
                                                    {data?.status}
                                                </Typography>
                                            ) :
                                                data?.status === "Completed" ? (
                                                    <Typography textAlign='center' fontSize="1.1rem" color="green">
                                                        {data?.status}
                                                    </Typography>
                                                ) : (
                                                    <TextField
                                                        name="status"
                                                        label="Status"
                                                        select
                                                        value={data.status ? data.status : status}
                                                        onChange={(e) => {
                                                            handleStatusChange(e, data._id);
                                                        }}
                                                        fullWidth
                                                    >
                                                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                                                        <MenuItem value="Completed">Completed</MenuItem>
                                                    </TextField>
                                                )}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {
                                            data.status === "Completed" ? (
                                                data.feedback ? (
                                                    <CheckCircle sx={{ fontSize: 28, color: 'green' }} />
                                                ) : (
                                                    <label htmlFor="icon-button-file">
                                                        <Input
                                                            accept="image/*"
                                                            id="icon-button-file"
                                                            sx={{ display: "none" }}
                                                            type="file"
                                                            onChange={(e) => handleFeedback(e, data._id)}
                                                        />
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="upload picture"
                                                            component="span"
                                                        >
                                                            <RateReview
                                                                sx={{ fontSize: 25, color: "blue" }}
                                                            />
                                                        </IconButton>
                                                    </label>
                                                )
                                            ) : (
                                                <Pending sx={{ fontSize: 28, color: '#90EE90' }} />
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default ManageInterview
