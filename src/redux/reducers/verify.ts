import { AsyncStatus, IAsyncStatus, IActionObject } from "../interface";

interface LoginState {
  asyncStatus: IAsyncStatus;
  error?: string;
}

const INITIAL_STATE: LoginState = {
  asyncStatus: AsyncStatus.INIT,
};

const verify = (state = INITIAL_STATE, action: IActionObject): LoginState => {
  switch (action.type) {
    case "VERIFY_USER_REQUEST": {
      return {
        ...state,
        asyncStatus: AsyncStatus.LOADING,
      };
    }
    case "VERIFY_USER_SUCCESS": {
      return {
        asyncStatus: AsyncStatus.SUCCESS,
      };
    }
    case "VERIFY_USER_ERROR": {
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

export default verify;
