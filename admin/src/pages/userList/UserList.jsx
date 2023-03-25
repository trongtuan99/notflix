import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import dayjs from 'dayjs'

export default function UserList() {
  
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios.get("/users", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

      setUserList(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    getUserList();
  }, [])
  
  const handleDelete = (id) => {
    setUserList(userList.filter((item) => item._id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90,
      renderCell: (params) => {
        return (
          <div className="">
            {params.row._id}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Người dùng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"} alt="" />
            {params.row.userName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {dayjs(params.row.createdAt).format('DD/MM/YYYY')}
          </div>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: `/user/ + ${params.row._id}`, user: params.row}}>
              <button className="userListEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        getRowId={(row) => row._id}
        rows={userList}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}