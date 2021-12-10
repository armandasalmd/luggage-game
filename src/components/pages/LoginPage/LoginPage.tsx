import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetErrors } from "@redux/actions";
import type { RootState } from "@redux/store";
import { useHistory } from "react-router-dom";
import "./LoginPage.scss";
import { Button, Input, Logo } from "@components/atoms";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorState = useSelector((state: RootState) => state.error);

  const goToRegister = () => history.push("/auth/register");

  function onLogin() {
    dispatch(loginUser(email, password));
  }

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

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
              <Input
                placeholder="Enter e-mail"
                title="E-mail"
                tall
                value={email}
                error={errorState.errorFields?.email}
                setValue={setEmail}
                onSubmit={onLogin}
              />
              <Input
                placeholder="Enter password"
                title="Password"
                password
                tall
                error={errorState.errorFields?.password}
                value={password}
                setValue={setPassword}
                onSubmit={onLogin}
              />
              {errorState.errorMessage && (
                <p className="login__error">{errorState.errorMessage}</p>
              )}
              <Button type="accent" centerText tall onClick={onLogin}>
                Login
              </Button>
            </div>
            <div className="login__cardFooter">
              <Button type="link" onClick={goToRegister}>
                Create an account
              </Button>
            </div>
          </div>
          <div className="login__mainFooter">
            Luggage card game &copy; Armandas Barkauskas
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
