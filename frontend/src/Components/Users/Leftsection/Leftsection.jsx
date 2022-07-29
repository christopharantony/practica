import React from "react";
import "./Leftsection.css";
function Leftsection() {
    return (
        <div className="Leftsection">
            <div className="User-Home-container">
                <div className="User-Home-box"></div>
                <div className="User-Home-content">
                    <img
                        className="Leftsection-Avatar"
                        src="https://i.pravatar.cc/300"
                        alt="avatar"
                    />
                    <h3 className="Leftsection-Name">Amelie</h3>
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
