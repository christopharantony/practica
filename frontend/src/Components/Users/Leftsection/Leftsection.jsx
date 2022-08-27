import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axiosInstance";
import "./Leftsection.css";
function Leftsection() {
    const navigate = useNavigate()
    const [postCount, setPostCount] = useState(0);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'))

    const config = {
        headers: {
            token: localStorage.getItem('token')
        }
    }

    const getPostData = async () => {
        const { data } = await axios.get("api/post/myposts", config)
        setPostCount(data.postsCount);
    }

    const getUpcommingData = async () => {
        const { data } = await axios.get("api/interview/user/upcoming", config)
        setPending(data.pendingCount);
        setCompleted(data.completedCount);
    }

    useEffect(() => {
        getPostData()
        getUpcommingData();
        // eslint-disable-next-line
    } ,[user])

    const handleMyPosts = () => {
        navigate('/posts')
    }

    const handleMyInterviews = () => {
        navigate('/interviews')
    }

    const handleUpcoming = () => {
        navigate('/upcoming')
    }

    const handleNotifications = () => {
        navigate('/notifications')
    }

    return (
        <div className="Leftsection">
            <div className="User-Home-container">
                <div className="User-Home-box"></div>
                <div className="User-Home-content">
                    <Avatar
                        
                        className="Leftsection-Avatar"
                        // src="https://i.pravatar.cc/300"
                        sx={{ width: "80px", height: "80px" }}
                        src={user.pic}
                        alt="avatar"
                    />
                    <h3 className="Leftsection-Name">{user.name}</h3>
                </div>

                <ul className="User-Home-card__info">
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Connections</span>
                        <span className="User-Home-parameter pl-1">{user?.connections?.length}</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Pending Requests</span>
                        <span className="User-Home-parameter pl-1">{pending}</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Completed</span>
                        <span className="User-Home-parameter pl-1">{completed}</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter" onClick={handleMyPosts}>My Posts</span>
                        <span className="User-Home-parameter pl-1">{postCount}</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter" onClick={handleMyInterviews}>My Interviews</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter" onClick={handleUpcoming}>Upcoming Interviews</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter" onClick={handleNotifications}>Notifications</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Leftsection;
