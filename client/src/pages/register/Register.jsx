import { useRef, useState} from "react";
import Logo from "../../components/common/Logo";
import "./register.scss";
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const history = useHistory()

  const emailRef = useRef();

  const handleStart = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value)){
      setEmail(emailRef.current.value);
      return;
    }else{
      alert("Hãy nhập đúng địa chỉ email!")
      return;
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault()
    try{
      await axios.post("/auth/register", {email, password, userName})
      history.push("/login")
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <Logo />
          <Link to="/login" >
            <button className="loginButton">Đăng nhập</button>
          </Link>
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
            <input type="email" required placeholder="Email" ref={emailRef}/>
            <button className="registerButton" onClick={handleStart}>
              Bắt đầu
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="Họ tên" onChange={e => setUserName(e.target.value)}/>
            <input type="password" placeholder="Mật khẩu" onChange={e => setPassword(e.target.value)}/>
            <button className="registerButton" onClick={handleFinish}>
              Đăng Ký
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register