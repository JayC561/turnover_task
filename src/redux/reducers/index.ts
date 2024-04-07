import {
  ThunkDispatch,
  UnknownAction,
  combineReducers,
} from "@reduxjs/toolkit";
import categories from "./categories";
import signup from "./signup";

const reducers = { categories, signup };

export const rootReducer = combineReducers(reducers);

export type IState = ReturnType<typeof rootReducer>;
export type IDispatch = ThunkDispatch<IState, {}, UnknownAction>;
