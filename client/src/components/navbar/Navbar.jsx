import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState, useContext } from "react";
import "./navbar.scss";
import Logo from "../common/Logo";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../authContext/AuthContext.jsx'
import { logout } from '../../authContext/AuthAction.jsx'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch, user } = useContext(AuthContext)
  console.log(user);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <Logo />
          </Link>
          <Link to="/" className="link">
            <span>Trang chủ</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>Mới và phổ biến</span>
          <span>Danh sách của tôi</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src={user.profilePic || "https://i.pinimg.com/736x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg"}
            alt="avatar"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>
                {user.userName}
              </span>
              <span onClick={handleLogout}>
                Đăng xuất
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;