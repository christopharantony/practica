import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosInstance";
import "./InterLeft.css";
function InterLeft() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [postCount, setPostCount] = useState(0);
    const [upcoming, SetUpcoming] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        } else {
            const userData = JSON.parse(localStorage.getItem('user'))
            setUser(userData);
        }
    }, [navigate])

    const config = {
        headers: {
            token: localStorage.getItem('token')
        }
    }

    const getPostData = async () => {
        const { data } = await axios.get("api/post/myposts", config)
        setPostCount(data.postsCount);
    }

    const getUpcommingData = async() => {
        const { data } = await axios.get('api/interview/interviewer/upcoming', config)
        SetUpcoming(data.upcomingCount)
    }

    useEffect(() => {
        getPostData()
        getUpcommingData()
        // eslint-disable-next-line
    }, [user])

    const handleRequest = () => {
        navigate("/requests")
    }

    const handleUpcoming = () => {
        navigate("/upcommings");
    };

    const handleManageRequest = () => {
        navigate("/interview/management");
    };

    const handleReport = () => {
        navigate("/report");
    };

    const handlePost = () => {
        navigate('/posts')
    }

    const handleDashboard = () => {
        navigate('/dashboard')
    }
    return (
        <div className="InterLeft">
            <div className="User-Home-container">
                <div className="User-Home-box"></div>
                <div className="User-Home-content">
                    <Avatar

                        className="InterLeft-Avatar"
                        // src="https://i.pravatar.cc/300"
                        sx={{ width: "80px", height: "80px" }}
                        src={user.pic}
                        alt="avatar"
                    />
                    <h3 className="InterLeft-Name">{user.name}</h3>
                </div>

                <ul className="User-Home-card__info">
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter">Connections</span>
                        <span className="User-Home-parameter pl-1">{user?.connections?.length}</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handlePost}>My Posts</span>
                        <span className="User-Home-parameter pl-1">{postCount}</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handleUpcoming}>Upcoming</span>
                        <span className="User-Home-parameter pl-1">{upcoming}</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handleRequest}>Requests</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handleDashboard}>Dashboard</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handleManageRequest}>ManageRequest</span>
                    </li>
                    <li className="InterLeft-lists">
                        <span className="User-Home-parameter" onClick={handleReport}>Report</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default InterLeft;
