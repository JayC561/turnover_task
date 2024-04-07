import { ActionType } from "./actions";
import { AxiosResponse } from "axios";

export enum AsyncStatus {
  INIT = "INIT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type IAsyncStatus = keyof typeof AsyncStatus;

export interface IActionObject {
  type: ActionType;
  response?: AxiosResponse<any>;
  error?: string;
}
