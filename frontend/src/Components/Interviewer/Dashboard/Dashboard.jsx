import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardDesign from "./DashboardDesign";

function Dashboard() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/home");
    }

    return (
        <div className="All-Request bg-white">
            <CloseIcon className="Close-button" onClick={handleClose} />
            <Box className="scrollbar-hidden" sx={{overflow:'scroll', height:450, width:'100%'}}>
            <DashboardDesign/>
            </Box>
        </div>
    )
}

export default Dashboard
