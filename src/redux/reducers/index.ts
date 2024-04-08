import {
  ThunkDispatch,
  UnknownAction,
  combineReducers,
} from "@reduxjs/toolkit";
import categories from "./categories";
import signup from "./signup";
import login from "./login";
import verify from "./verify";

const reducers = { categories, signup, login, verify };

export const rootReducer = combineReducers(reducers);

export type IState = ReturnType<typeof rootReducer>;
