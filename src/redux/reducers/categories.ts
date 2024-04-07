import { CategoriesResponse } from "../api/interface";
import { AsyncStatus, IAsyncStatus, IActionObject } from "../interface";

interface CategoriesState {
  asyncStatus: IAsyncStatus;
  data?: CategoriesResponse;
  error?: string;
}

const INITIAL_STATE: CategoriesState = {
  asyncStatus: AsyncStatus.INIT,
  data: [],
};

const categories = (
  state = INITIAL_STATE,
  action: IActionObject
): CategoriesState => {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST": {
      return {
        ...state,
        asyncStatus: AsyncStatus.LOADING,
      };
    }
    case "GET_CATEGORIES_SUCCESS": {
      return {
        asyncStatus: AsyncStatus.SUCCESS,
        data: action.response?.data || [],
      };
    }
    case "GET_CATEGORIES_ERROR": {
      return {
        asyncStatus: AsyncStatus.ERROR,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default categories;
