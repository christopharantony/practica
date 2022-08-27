import { Box, Grid, IconButton, Paper, TableContainer, Typography } from "@mui/material"
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "../../../axiosInstance";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Report() {
    const navigate = useNavigate();
    const [request, setRequest] = useState([]);

    const generateError = (error) =>
        toast.error(error, {
            position: "bottom-right"
        })

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const getRequests = async () => {
        try {
            const { data } = await axios.get('api/interview/requests', config)
            setRequest(data.requests)
        } catch (error) {
            generateError("Something went wrong")
        }
    }

    useEffect(() => {
        getRequests()
        // eslint-disable-next-line
    }, [])

    const handleClose = () => {
        navigate("/home");
    }

    const columns = [
        {
            field: "id",
            headerClassName: "super-app-theme--header",
            headerName: "ID",
            width: 45,
        },
        {
            field: "name",
            headerClassName: "super-app-theme--header",
            headerName: "Name",
            width: 165,
            editable: true,
        },
        {
            field: "about",
            headerClassName: "super-app-theme--header",
            headerName: "About",
            width: 140,
            editable: true,
        },
        {
            field: "phone",
            headerClassName: "super-app-theme--header",
            headerName: "Phone",
            width: 130,
            editable: true,
        },
        {
            field: "date",
            headerClassName: "super-app-theme--header",
            headerName: "Date",
            width: 130,
            editable: true,
        },
        {
            field: "time",
            headerClassName: "super-app-theme--header",
            headerName: "Time",
            type: "number",
            width: 104,
            editable: true,
        },
        {
            field: "status",
            headerClassName: "super-app-theme--header",
            headerName: "Status",
            width: 140,
            editable: true,
        },
    ];


    const rows = request.map((data, index) => ({
        id: index + 1,
        name: data.userId.name,
        about: data.userId.domain ? data.userId.domain : 'N/A',
        phone: data.userId.mobile,
        date: dayjs(data.date).format("MMM, DD YYYY"),
        time: dayjs(data.time).format("hh:mm a"),
        status: data.status
    }));

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
                        height: 401.9,
                        overflow: "scroll",
                    }}
                >
                    <Box
                        sx={{
                            height: 401.9,
                            width: 1,
                            "& .super-app-theme--header": {
                                backgroundColor: "primary.main",
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            // checkboxSelection
                            components={{ Toolbar: GridToolbarExport }}
                            disableSelectionOnClick
                        ></DataGrid>
                    </Box>
                </TableContainer>
            </Box>
        </div>
    )
}

export default Report
