import { Grid } from "@mui/material"
import InterLeft from "../../../Components/Interviewer/InterLeft/InterLeft"
import Report from "../../../Components/Interviewer/Report/Report"
import HomeHeader from "../../../Layout/HomeHeader/HomeHeader"

function InterviewerReportPage() {
    return (
        <div className='User-Home'>
            <HomeHeader />
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <InterLeft />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Report />
                </Grid>
            </Grid>
        </div>
    )
}

export default InterviewerReportPage
