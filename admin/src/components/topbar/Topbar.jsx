import React from "react";
import "./topbar.css";
import { AuthContext } from "../../context/authContext/AuthContext.jsx";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { ArrowDropDown } from "@material-ui/icons";
import { logout } from "../../context/authContext/AuthAction.jsx";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext)
  const handleLogout = () => {
    dispatch(logout());
  }
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link className="link" to="/">
          <span className="logo">Notflix Admin</span>
        </Link>
        </div>
        <div className="topRight">
          <p>{user.userName}</p>
          <img src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"} alt="avatar" className="topAvatar" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <button onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}