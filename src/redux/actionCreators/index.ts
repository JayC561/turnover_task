import { AxiosError, AxiosResponse } from "axios";
import actions, { ActionType } from "../actions";
import api from "../api";
import { UnknownAction, Dispatch, bindActionCreators } from "redux";
import {
  CategoriesResponse,
  SignUpUserPayload,
  LoginUserPayload,
} from "../api/interface";
import { IDispatch } from "../reducers";

const createAsyncAction = <TReq, TRes>(
  action: [ActionType, ActionType, ActionType],
  api: (request: TReq) => Promise<AxiosResponse<TRes>>
) => {
  return (request: TReq) => {
    return async (dispatch: Dispatch): Promise<UnknownAction> => {
      const [loadingAction, successAction, errorAction] = action;
      dispatch({ type: loadingAction });
      try {
        const response = await api(request);
        return dispatch({ type: successAction, response });
      } catch (error) {
        const errMessage =
          (error as AxiosError)?.response?.data || "Something went wrong";
        return dispatch({
          type: errorAction,
          error: errMessage,
        });
      }
    };
  };
};

const actionsCreators = {
  getCategories: createAsyncAction<{}, CategoriesResponse>(
    [
      actions.GET_CATEGORIES_REQUEST,
      actions.GET_CATEGORIES_SUCCESS,
      actions.GET_CATEGORIES_ERROR,
    ],
    api.getCategories
  ),
  signupUser: createAsyncAction<SignUpUserPayload, {}>(
    [
      actions.SIGNUP_USER_REQUEST,
      actions.SIGNUP_USER_SUCCESS,
      actions.SIGNUP_USER_ERROR,
    ],
    api.signUpUser
  ),
};

export const mapDisptachToProps = (dispatch: IDispatch) => {
  return bindActionCreators(actionsCreators, dispatch);
};
