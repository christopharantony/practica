import "./interviewerList.scss"
import Sidebar from "../../../Components/Admin/sidebar/Sidebar"
import Datatable from "../../../Components/Admin/interviewerDatatable/interviewerDatatable"

const interviewerList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  )
}

export default interviewerList