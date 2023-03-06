import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import Logo from "../common/Logo";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
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
            src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Cài đặt</span>
              <span>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;