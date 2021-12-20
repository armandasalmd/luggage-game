import { useDispatch } from "react-redux";

import { registerUser } from "@redux/actions";
import AuthPage, { ActionButton, FormItem } from "../AuthPage/AuthPage";
import RouteUtils from "@utils/Route";

function RegisterPage() {
  const dispatch = useDispatch();

  const actionButton: ActionButton = {
    text: "Already have an account? Login",
    path: RouteUtils.routes.app.auth.login.path,
  };
  
  const formItems: FormItem[] = [
    {
      name: "username",
      placeholder: "Enter username",
      title: "Username",
    },
    {
      name: "password",
      placeholder: "Enter password",
      title: "Password",
      isPassword: true,
    },
    {
      name: "password2",
      placeholder: "Repeat password",
      title: "Repeat password",
      isPassword: true,
    },
  ];

  function onSubmit(formState: any) {
    dispatch(registerUser(formState));
  }


  return (
    <AuthPage
      actionButton={actionButton}
      formItems={formItems}
      onSubmit={onSubmit}
      submitText="Register"
      title="Create an account"
      termsWarning
    />
  );
}

export default RegisterPage;
