import { AnyAction } from "redux";

export interface IAction extends AnyAction {
  payload?: any;
}

export enum ActionTypes {
  Login,
  Logout,
  SetErrorMessage,
  SetErrorFields,
  ResetErrors
};

export * from "./userActions";
export * from "./errorActions";