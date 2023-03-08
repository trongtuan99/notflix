import Logo from "../../components/common/Logo.jsx";
import "./login.scss";
import { useState, useContext } from 'react'
import { login } from "../../authContext/ApiCall.jsx";
import { AuthContext } from '../../authContext/AuthContext.jsx'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    login({email, password}, dispatch)
  }

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
          <input type="email" placeholder="Email hoặc SDT" value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="loginButton">Đăng nhập</button>
          <span>
            Chưa có tài khoản Notflix ? <Link to="/register"><b>Đăng ký ngay !</b></Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login