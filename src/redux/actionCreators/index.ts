import { AxiosError, AxiosResponse } from "axios";
import actions, { ActionType } from "../actions";
import api from "../api";
import { UnknownAction, Dispatch, bindActionCreators } from "redux";
import { IActionObject } from "../interface";
import {
  CategoriesResponse,
  SignUpUserPayload,
  LoginUserPayload,
  SignupUserResponse,
  VerifyUserPayload,
} from "../api/interface";
import { ThunkDispatch } from "redux-thunk";
import { IState } from "../reducers";

const createAsyncAction =
  <TReq, TRes>(
    action: [ActionType, ActionType, ActionType],
    api: (payload: TReq) => Promise<AxiosResponse<TRes>>
  ) =>
  (request: TReq) => {
    return async (dispatch: Dispatch): Promise<IActionObject> => {
      const [loadingAction, successAction, errorAction] = action;
      dispatch({ type: loadingAction });
      try {
        const response = await api(request);
        return dispatch({
          type: successAction,
          response,
        } as IActionObject);
      } catch (error) {
        const errMessage =
          (error as AxiosError)?.response?.data || "Something went wrong";
        return dispatch({
          type: errorAction,
          error: errMessage,
        } as IActionObject);
      }
    };
  };

const actionCreators = {
  getCategories: createAsyncAction<{}, CategoriesResponse>(
    [
      actions.GET_CATEGORIES_REQUEST,
      actions.GET_CATEGORIES_SUCCESS,
      actions.GET_CATEGORIES_ERROR,
    ],
    api.getCategories
  ),
  signupUser: createAsyncAction<SignUpUserPayload, SignupUserResponse>(
    [
      actions.SIGNUP_USER_REQUEST,
      actions.SIGNUP_USER_SUCCESS,
      actions.SIGNUP_USER_ERROR,
    ],
    api.signUpUser
  ),
  loginUser: createAsyncAction<LoginUserPayload, {}>(
    [
      actions.LOGIN_USER_REQUEST,
      actions.LOGIN_USER_SUCCESS,
      actions.LOGIN_USER_ERROR,
    ],
    api.loginUser
  ),
  verifyUser: createAsyncAction<VerifyUserPayload, {}>(
    [
      actions.VERIFY_USER_REQUEST,
      actions.VERIFY_USER_SUCCESS,
      actions.VERIFY_USER_ERROR,
    ],
    api.verifyUser
  ),
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<IState, {}, UnknownAction>
) => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
  };
};
