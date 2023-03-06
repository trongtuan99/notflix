import { useRef, useState} from "react";
import Logo from "../../components/common/Logo";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <Logo />
          <button className="loginButton">Đăng nhập</button>
        </div>
      </div>
      <div className="container">
        <h1>Không giới hạn phim, chương trình truyền hình !</h1>
        <h2>Xem ở bất cứ đâu. Hủy bỏ bất cứ lúc nào.</h2>
        <p>
        Sẵn sàng để xem? Nhập email của bạn để tạo hoặc khởi động lại tư cách thành viên của bạn.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Bắt đầu
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="Mật khẩu" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Bắt đầu
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register