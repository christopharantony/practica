import React from "react";
import "./Profile.css";
function Profile() {
    return (
        <div className="Profile">
            <div className="User-container">
                <div className="User-box"></div>
                <div className="User-content">
                    <img
                        className="Profile-Avatar"
                        src="https://i.pravatar.cc/300"
                        alt="avatar"
                    />
                    <h3 className="Profile-Name">Amelie</h3>
                    <span className="User-profession">MERN Developer </span>
                </div>

                <ul className="User-card__info">
                    <li className="Profile-lists">
                        <span className="User-value">50</span>
                        <span className="User-parameter">Posts</span>
                    </li>
                    <li className="Profile-lists">
                        <span className="User-value">5000</span>
                        <span className="User-parameter">Followers</span>
                    </li>
                    <button className="User-follow">Connect</button>
                </ul>
            </div>
        </div>
    );
}

export default Profile;
