import axios, { AxiosResponse } from "axios";
import {
  CategoriesResponse,
  SignupUserResponse,
  SignUpUserPayload,
  LoginUserPayload,
} from "./interface";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

const api = {
  getCategories() {
    return client.get<CategoriesResponse>("/categories");
  },
  signUpUser(req: SignUpUserPayload) {
    return client.post<SignUpUserPayload, SignupUserResponse>(
      "/users",
      req
    ) as unknown as Promise<AxiosResponse<SignupUserResponse>>;
  },
  loginUser(req: LoginUserPayload) {
    return new Promise((res) => {
      setTimeout(() => {
        return res({
          email: req.email,
        });
      }, 1500);
    });
  },
};

export default api;
