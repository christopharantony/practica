import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import LineChart from "./LineChart"
import axios from '../../../axiosInstance'

function DashboardDesign() {
    const [request,setRequest] = useState(0);
    const [interview,setInterview] = useState(0);
    const [orderStatus,setOrderStatus] = useState([])
    const [orderStatusValue,setOrderStatusValue] = useState([])

    const config = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    const getChartData = async () => {
        const { data } = await axios.get('api/chart/interviewer',config)
        console.log("D@T@",data);
        setRequest(data.requests);
        setInterview(data.interviews)
        setOrderStatus(data.orderStatus)
        setOrderStatusValue(data.orderStatusValue)
    }

    useEffect(() => {
        getChartData()
        // eslint-disable-next-line
    },[])

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Card sx={{ m: 3, borderRadius: '15px' }}>
                    <CardContent >
                        <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                            Requests
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ backgroundColor: 'primary.main' }}>
                        <Typography textAlign='center' fontSize='1rem' fontWeight={600} >
                            {request}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card sx={{ m: 3, borderRadius: '15px' }}>
                    <CardContent >
                        <Typography textAlign='center' fontSize='1rem' fontWeight={600}>
                            Interviews
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ backgroundColor: 'primary.main' }}>
                        <Typography textAlign='center' fontSize='1rem' fontWeight={600} >
                            {interview}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            
            <Grid item md={12}>
                <Card sx={{ m: 3, height: '90%', width: '90%' }}>
                    <LineChart data={orderStatusValue} value={orderStatus} />
                </Card>
            </Grid>
        </Grid>
    )
}

export default DashboardDesign
