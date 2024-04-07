import { AsyncStatus, IAsyncStatus, IActionObject } from "../interface";
import { SignupUserResponse } from "../api/interface";

interface SignupState {
  asyncStatus: IAsyncStatus;
  data?: SignupUserResponse;
  error?: string;
}

const INITIAL_STATE: SignupState = {
  asyncStatus: AsyncStatus.INIT,
};

const signup = (state = INITIAL_STATE, action: IActionObject): SignupState => {
  switch (action.type) {
    case "SIGNUP_USER_REQUEST": {
      return {
        ...state,
        asyncStatus: AsyncStatus.LOADING,
      };
    }
    case "SIGNUP_USER_SUCCESS": {
      return {
        asyncStatus: AsyncStatus.SUCCESS,
        data: action?.response?.data || {},
      };
    }
    case "SIGNUP_USER_ERROR": {
      return {
        asyncStatus: AsyncStatus.ERROR,
        error: action?.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default signup;
