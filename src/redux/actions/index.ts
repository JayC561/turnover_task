enum actions {
  GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST",
  GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR",

  SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST",
  SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS",
  SIGNUP_USER_ERROR = "SIGNUP_USER_ERROR",
}

export default actions;

export type ActionType = keyof typeof actions;