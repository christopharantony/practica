import "./interviewerDatatable.scss";
import { InputBase, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { interviewerColumns } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axiosInstance";

const Datatable = () => {

  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("api/admin/allInterviewers")
    setData(data)
  }
  
  useEffect( () => {
    fetchData()
  }, [])

  const blockuser = async (id)=>{
    await axios.post(`api/admin/blockUser?id=${id}`,{},{withCredentials:true})
    const {data} = await axios.get("api/admin/allInterviewers")
    setData(data);
  }
  const rows = data
    .filter((user) => {
      if (search === "") {
        return user;
      } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
        return user;
      }
    })
    .map((user, index) => ({
      sl: index + 1,
      id: user._id,
      name: user.name,
      company: user.company,
      email: user.email,
      mobile: user.mobile,
      blocked: user.blocked,
    }));

  const blockButton = (params) => {
    return (
      <div className="cellStatus">
        <Button style={{ textDecoration: "none" }} onClick={()=>{blockuser(params.row.id)}} >
          {params.row.blocked &&
          <div className="Suspended" >Blocked</div>
        }{!params.row.blocked &&
        <div className="Active">Actived</div>
        }
        </Button>
      </div>
    );
  };

  const actionColumn = [
    {
      field: "blocked",
      headerName: "Status",
      width: 130,
      renderCell: blockButton,
      disableClickEventBubbling: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
      disableClickEventBubbling: true,
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Interviewer Management
        <InputBase
          style={{
            backgroundColor: "#dadada",
            borderRadius: "1rem",
            padding: ".5rem",
            marginRight: "1rem",
            height: "3.5rem",
          }}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={interviewerColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
