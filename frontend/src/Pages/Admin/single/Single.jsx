import "./single.scss";
import Sidebar from "../../../Components/Admin/sidebar/Sidebar";
import List from "../../../Components/Admin/table/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Single = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate('/admin/login')
      }
    };
    verifyUser();
  }, [])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Attended Interviews</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
