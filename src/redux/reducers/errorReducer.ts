import { IAction, ActionTypes } from "@redux/actions";

export interface IErrorState {
  errorMessage: string | null;
  errorFields: any;
}

const initialState: IErrorState = {
  errorMessage: null,
  errorFields: null
};

const reducer = (state = {...initialState}, { type, payload }: IAction) => {
  switch (type) {
    case ActionTypes.ResetErrors:
      return {...initialState};
    case ActionTypes.SetErrorMessage:
      return {errorFields: null, errorMessage: payload};
    case ActionTypes.SetErrorFields:
      return {errorMessage: null, errorFields: payload};
    default:
      return state;
  }
};

export default reducer;