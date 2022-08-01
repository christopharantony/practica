import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react"

// import { DarkModeContext } from "../../../context/darkModeContext";
// import { useContext } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li> */}
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/interviewers" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Interviewers</span>
            </li>
          </Link>
          <li onClick={adminLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="item">
      </div>
    </div>
  );
};

export default Sidebar;
