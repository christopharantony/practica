import "./userList.scss"
import Sidebar from "../../../Components/Admin/sidebar/Sidebar"
import Datatable from "../../../Components/Admin/userDatatable/userDatatable"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const UserList = () => {
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
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  )
}

export default UserList