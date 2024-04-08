import { AsyncStatus, IAsyncStatus, IActionObject } from "../interface";

interface LoginState {
  asyncStatus: IAsyncStatus;
  error?: string;
}

const INITIAL_STATE: LoginState = {
  asyncStatus: AsyncStatus.INIT,
};

const login = (state = INITIAL_STATE, action: IActionObject): LoginState => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST": {
      return {
        ...state,
        asyncStatus: AsyncStatus.LOADING,
      };
    }
    case "LOGIN_USER_SUCCESS": {
      return {
        asyncStatus: AsyncStatus.SUCCESS,
      };
    }
    case "LOGIN_USER_ERROR": {
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

export default login;
