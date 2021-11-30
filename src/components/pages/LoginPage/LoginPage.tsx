import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";
import { Button, Input, Logo } from "@components/atoms";
import { loginUser } from "@redux/actions";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const goToRegister = () => history.push("/auth/register");

  function onLogin() {
    dispatch(loginUser());
  }

  return (
    <div className="login">
      <img
        className="login__background"
        alt="login-background"
        src="/images/login-background.svg"
      />
      <div className="login__container">
        <div className="login__logo">
          <Logo size="L" />
        </div>
        <div className="login__main">
          <div className="login__card">
            <h1 className="login__cardTitle">Login</h1>
            <div className="login__cardBody">
              <Input placeholder="Enter e-mail" title="E-mail" tall />
              <Input placeholder="Enter password" title="Password" tall style={{marginBottom: 16}} />
              <Button type="accent" centerText tall onClick={onLogin}>Login</Button>
            </div>
            <div className="login__cardFooter">
              <Button type="link" onClick={goToRegister}>Create an account</Button>
            </div>
          </div>
          <div className="login__mainFooter">Luggage card game &copy; Armandas Barkauskas</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
