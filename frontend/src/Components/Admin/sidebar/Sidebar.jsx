import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
import axios from "../../../axiosInstance"
// import { useEffect } from "react";

// import { DarkModeContext } from "../../../context/darkModeContext";
// import { useContext } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  // const [cookie,removeCookie] = useCookies([]);
  // const { dispatch } = useContext(DarkModeContext);
  // useEffect(() => {
  //   if (!cookies.adminjwt) {
  //     navigate("/adminLogin");
  //   }
  // },[])

  const adminLogout = async () => {
    console.log("logout")
    // localStorage.removeItem("adminjwt");
    localStorage.removeItem("adminToken");
    // console.log("logout",cookie.adminjwt);
    // removeCookie("adminjwt")
    const {data} = await axios.post("api/admin/logout",{},{
      withCredentials:true
    })
    console.log('data',data);
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
          {/* <li>
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            <span>Theme</span>
          </li> */}
        </ul>
      </div>
      <div className="item">
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
