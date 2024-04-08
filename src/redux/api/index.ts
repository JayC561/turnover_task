import axios, { AxiosResponse } from "axios";
import {
  CategoriesResponse,
  SignupUserResponse,
  SignUpUserPayload,
  LoginUserPayload,
  VerifyUserPayload,
} from "./interface";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

client.interceptors.response.use(async (response) => {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return response.data;
});

const api = {
  getCategories() {
    return client.get<CategoriesResponse>("/categories");
  },
  signUpUser(req: SignUpUserPayload) {
    return client.post<
      SignupUserResponse,
      AxiosResponse<SignupUserResponse, SignUpUserPayload>
    >("/users", req);
  },
  loginUser(req: LoginUserPayload) {
    return client.post<{}, AxiosResponse<{}, LoginUserPayload>>("/login", req);
  },
  verifyUser(req: VerifyUserPayload) {
    return client.post<{}, AxiosResponse<{}, VerifyUserPayload>>(
      "/verify",
      req
    );
  },
};

export default api;
