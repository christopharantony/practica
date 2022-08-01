// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
import "./interviewerList.scss"
import Sidebar from "../../../Components/Admin/sidebar/Sidebar"
import Datatable from "../../../Components/Admin/interviewerDatatable/interviewerDatatable"

const InterviewerList = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const token = localStorage.getItem("adminToken");
  //     if (!token) {
  //       navigate('/admin/login')
  //     }
  //   };
  //   verifyUser();
  // }, [])
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  )
}

export default InterviewerList