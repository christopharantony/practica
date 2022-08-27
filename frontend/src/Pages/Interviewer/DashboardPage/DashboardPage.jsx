import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../Components/Interviewer/Dashboard/Dashboard";
import InterLeft from "../../../Components/Interviewer/InterLeft/InterLeft";
import HomeHeader from "../../../Layout/HomeHeader/HomeHeader";

function DashboardPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token && user) {
            navigate('/')
        }
    })
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <InterLeft />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Dashboard />
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardPage
