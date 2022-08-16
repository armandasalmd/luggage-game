import { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import usePWA from "react-pwa-install-prompt";

import "./AuthPage.scss";
import { Button, Input, Logo, SocialButton } from "@components/atoms";
import type { RootState } from "@redux/store";
import { resetErrors } from "@redux/actions";
import RouteVariables from "@utils/RouteVariables";

export interface FormItem {
  name: string;
  defaultValue?: string;
  isPassword?: boolean;
  placeholder: string;
  title: string;
}

export interface ActionButton {
  text: string;
  path: string;
}

interface AuthPageProps {
  actionButton: ActionButton;
  formItems: FormItem[];
  onSubmit(state: any): void;
  submitText: string;
  title: string;
  termsWarning?: boolean;
}

const AuthPage: FC<AuthPageProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const errorState = useSelector((state: RootState) => state.error);
  const { isStandalone, isInstallPromptSupported } = usePWA();

  const defaultState = props.formItems.reduce(function (acc, item: FormItem) {
    return {
      ...acc,
      [item.name]: item.defaultValue || "",
    };
  }, {});

  const [formState, setFormState] = useState<any>(defaultState);

  const onActionClick = () => history.push(props.actionButton.path);

  function setField(name: string, value: string) {
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function getField(name: string): string {
    return formState[name] || "";
  }

  function getError(name: string): string {
    return errorState.errorFields ? errorState.errorFields[name] : null;
  }

  function handleSubmit() {
    props.onSubmit(formState);
  }

  const inputs = props.formItems.map(function (item: FormItem) {
    return (
      <Input
        key={item.name}
        placeholder={item.placeholder}
        title={item.title}
        tall
        value={getField(item.name)}
        setValue={setField.bind(null, item.name)}
        onSubmit={handleSubmit}
        error={getError(item.name)}
        password={item.isPassword}
      />
    );
  });

  useEffect(() => {
    if (isStandalone && isInstallPromptSupported) {
      history.push("/install");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  const termsLink = (
    <Link target="_blank" to={RouteVariables.app.legal.terms.path}>
      Terms and Conditions
    </Link>
  );

  return (
    <div className="auth">
      <img
        className="auth__background"
        alt="login-background"
        src="/images/login-background.svg"
      />
      <div className="auth__container">
        <div className="auth__logo">
          <Logo size="L" />
        </div>
        <div className="auth__main">
          <div className="auth__card">
            <h1 className="auth__cardTitle">{props.title}</h1>
            <div className="auth__social">
              <SocialButton type="google" />
              <SocialButton type="facebook" />
            </div>
            <div className="auth__or">
              <div></div>
              <p>or</p>
              <div></div>
            </div>
            <div className="auth__cardBody">
              {inputs}
              {errorState.errorMessage && (
                <p className="auth__error">{errorState.errorMessage}</p>
              )}
              {props.termsWarning && (
                <p className="auth__termsWarning">
                  By creating an account you agree with{" "}
                  {termsLink}
                </p>
              )}
              <Button type="accent" centerText tall onClick={handleSubmit}>
                {props.submitText}
              </Button>
            </div>
            <div className="auth__cardFooter">
              <Button type="link" onClick={onActionClick}>
                {props.actionButton.text}
              </Button>
            </div>
          </div>
          <div className="auth__mainFooter">
            Luggage card game &copy; Armandas Barkauskas
          </div>
          <div className="auth__actions">{termsLink}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
