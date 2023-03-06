import Logo from "../../components/common/Logo";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Logo />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Đăng nhập</h1>
          <input type="email" placeholder="Email hoặc SDT" />
          <input type="password" placeholder="Mật khẩu" />
          <button className="loginButton">Đăng nhập</button>
          <span>
            Chưa có tài khoản Notflix ? <a href="/register"><b>Đăng ký ngay !</b></a>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login