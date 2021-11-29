import "./LoginPage.scss";
import { LoginIcon } from "@components/molecules";
import { Button, Input } from "@components/atoms";

function LoginPage() {
  return (
    <div className="login">
      <img
        className="login__background"
        alt="login-background"
        src="/images/login-background.svg"
      />
      <div className="login__container">
        <div className="login__logo">
          <LoginIcon />
        </div>
        <div className="login__main">
          <div className="login__card">
            <h1 className="login__cardTitle">Login</h1>
            <div className="login__cardBody">
              <Input placeholder="Enter e-mail" title="E-mail" tall />
              <Input placeholder="Enter password" title="Password" tall />
              <Button type="accent" centerText tall style={{marginTop: 16}}>Login</Button>
            </div>
            <div className="login__cardFooter">
              <Button type="link">Create an account</Button>
            </div>
          </div>
          <div className="login__mainFooter">Luggage card game &copy; Armandas Barkauskas</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
