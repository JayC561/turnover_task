//Response-------------------------------------------------------------

export interface Categories {
  id: number;
  name: string;
}

export type CategoriesResponse = Array<Categories>;

export interface SignupUserResponse extends SignUpUserPayload {
  id: number;
}

//Request-------------------------------------------------------------

export interface SignUpUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface VerifyUserPayload {
  otp: string;
  email: string;
}
