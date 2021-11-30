import "../LoginPage/LoginPage.scss";
import { useHistory } from "react-router-dom";
import { Button, Input, Logo } from "@components/atoms";

function RegisterPage() {
  const history = useHistory();

  const goToLogin = () => history.push("/auth/login");

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
            <h1 className="login__cardTitle">Create an account</h1>
            <div className="login__cardBody">
              <Input placeholder="Enter username" title="Display name" tall />
              <Input placeholder="Enter e-mail" title="E-mail" tall />
              <Input placeholder="Enter password" title="Password" tall />
              <Input placeholder="Repeat password" title="Repeat password" tall style={{marginBottom: 16}} />
              <Button type="accent" centerText tall>Register</Button>
            </div>
            <div className="login__cardFooter">
              <Button type="link" onClick={goToLogin}>Already have an account? Login</Button>
            </div>
          </div>
          <div className="login__mainFooter">Luggage card game &copy; Armandas Barkauskas</div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
