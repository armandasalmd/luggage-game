import { useDispatch } from "react-redux";

import { loginUser } from "@redux/actions";
import AuthPage, { ActionButton, FormItem } from "../AuthPage/AuthPage";
import RouteUtils from "@utils/Route";

function LoginPage() {
  const dispatch = useDispatch();

  const actionButton: ActionButton = {
    text: "Create an account",
    path: RouteUtils.routes.app.auth.register.path,
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
  ];

  function onSubmit(formState: any) {
    const email = formState[formItems[0].name];
    const password = formState[formItems[1].name];
    dispatch(loginUser(email, password));
  }

  return (
    <AuthPage
      actionButton={actionButton}
      formItems={formItems}
      onSubmit={onSubmit}
      submitText="Login"
      title="Login"
    />
  );
}

export default LoginPage;
