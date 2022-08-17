import { Avatar } from "@mui/material";
import "./Leftsection.css";
function Leftsection() {
    const user = JSON.parse(localStorage.getItem('user'))
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
                        <span className="User-Home-parameter pl-1">500</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Upcoming</span>
                        <span className="User-Home-parameter pl-1">5</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Requests</span>
                        <span className="User-Home-parameter pl-1">15</span>
                    </li>
                    <li className="Leftsection-lists">
                        <span className="User-Home-parameter">Posts</span>
                        <span className="User-Home-parameter pl-1">23</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Leftsection;
