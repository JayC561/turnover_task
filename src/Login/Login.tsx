import React, { useEffect } from "react";
import "../css/login.css";
import "../css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Error from "../common/Error";
import { IState } from "../redux/reducers";
import { ConnectedProps, connect } from "react-redux";
import { mapDispatchToProps } from "../redux/actionCreators";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorMessages } from "../util";
import { isLoading, isSuccess } from "../redux/util";
import Spinner from "../common/Spinner";
import { useAuth } from "../AuthProvider";

interface FormField {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email(ErrorMessages.ValidEmail)
    .required(ErrorMessages.Required),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      ErrorMessages.StrongPassword
    )
    .required(ErrorMessages.Required),
});

const Login: React.FC<Props> = ({ login, loginUser }) => {
  const navigate = useNavigate();
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormField) => {
    loginUser({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess(login)) {
      user?.setIsLogined(true);
      navigate("/categories");
    }
  }, [login]);

  return (
    <>
      {isLoading(login) ? (
        <Spinner />
      ) : (
        <div className="login-container">
          <div>
            <p className="login-heading">Login</p>
            <p className="welcome-back">Welcome back to ECOMMERCE</p>
            <p className="next-gen">The next gen business marketplace</p>
          </div>
          <div className="form-wrapper" style={{ marginTop: "31px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-field">
                <label>Email</label>
                <input type="text" placeholder="Enter" {...register("email")} />
                {errors?.email && <Error error={errors?.email?.message} />}
              </div>
              <div className="input-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter"
                  {...register("password")}
                />
                {errors?.password && (
                  <Error error={errors?.password?.message} />
                )}
              </div>
              <div className="input-field">
                <button type="submit" className="input-field-btn">
                  LOGIN
                </button>
              </div>
              <hr></hr>
              <p className="have-an-account">
                Don't have an account?{" "}
                <Link to={"/sign-up"} className="lgn-btn">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  login: state.login,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(Login);
