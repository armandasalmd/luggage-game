import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetErrors } from "@redux/actions";
import type { RootState } from "@redux/store";
import "../LoginPage/LoginPage.scss";
import { useHistory } from "react-router-dom";
import { Button, Input, Logo } from "@components/atoms";

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errorState = useSelector((state: RootState) => state.error);

  const goToLogin = () => history.push("/auth/login");

  function onRegister() {
    dispatch(
      registerUser({
        username,
        email,
        password,
        password2,
      })
    );
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
            <h1 className="login__cardTitle">Create an account</h1>
            <div className="login__cardBody">
              <Input
                placeholder="Enter username"
                title="Display name"
                tall
                error={errorState.errorFields?.username}
                value={username}
                setValue={setUsername}
                onSubmit={onRegister}
              />
              <Input
                placeholder="Enter e-mail"
                title="E-mail"
                tall
                error={errorState.errorFields?.email}
                value={email}
                setValue={setEmail}
                onSubmit={onRegister}
              />
              <Input
                password
                placeholder="Enter password"
                title="Password"
                tall
                error={errorState.errorFields?.password}
                value={password}
                setValue={setPassword}
                onSubmit={onRegister}
              />
              <Input
                password
                placeholder="Repeat password"
                title="Repeat password"
                tall
                error={errorState.errorFields?.password2}
                value={password2}
                setValue={setPassword2}
                onSubmit={onRegister}
              />
              {errorState.errorMessage && (
                <p className="login__error">{errorState.errorMessage}</p>
              )}
              <Button type="accent" onClick={onRegister} centerText tall>
                Register
              </Button>
            </div>
            <div className="login__cardFooter">
              <Button type="link" onClick={goToLogin}>
                Already have an account? Login
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

export default RegisterPage;
