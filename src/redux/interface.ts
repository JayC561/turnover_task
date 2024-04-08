import { ActionType } from "./actions";
import { AxiosResponse } from "axios";

export enum AsyncStatus {
  INIT = "INIT",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type IAsyncStatus = keyof typeof AsyncStatus;

export type IActionObject = {
  type: ActionType;
  response?: any;
  error?: string;
};
