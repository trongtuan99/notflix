import "./app.scss";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Watch from "./pages/watch/Watch.jsx";
const App = () => {
  const user = true
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
      </Switch>
      {
        user && (
          <Switch>
            <Route path="/movies">
              <Home type="movie"/>
            </Route>
            <Route path="/series">
              <Home type="serie"/>
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </Switch>
        )
      }
    </Router>
  );
};

export default App;