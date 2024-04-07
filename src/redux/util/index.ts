import { IAsyncStatus, AsyncStatus } from "../interface";

interface ReducerState {
  asyncStatus: IAsyncStatus;
  data?: any;
}

export const isLoading = (state: ReducerState) => {
  return state.asyncStatus === AsyncStatus.LOADING;
};

export const isSuccess = (state: ReducerState) => {
  return state.asyncStatus === AsyncStatus.SUCCESS;
};
