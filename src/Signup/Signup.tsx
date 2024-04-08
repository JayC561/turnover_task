import React, { useEffect } from "react";
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
  name: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(ErrorMessages.Required),
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

const Signup: React.FC<Props> = ({ signup, signupUser }) => {
  const user = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormField) => {
    signupUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    user?.setEmail(data.email);
  };

  useEffect(() => {
    if (isSuccess(signup)) {
      navigate("/verify");
    }
  }, [signup]);

  return (
    <>
      {isLoading(signup) ? (
        <Spinner />
      ) : (
        <div className="signup-container">
          <div>
            <h1 className="signup-heading">Create your account</h1>
          </div>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-field">
                <label>Name</label>
                <input type="text" placeholder="Enter" {...register("name")} />
                {errors?.name && <Error error={errors?.name?.message} />}
              </div>
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
                  CREATE ACCOUNT
                </button>
              </div>
              <div>
                <p className="have-an-account">
                  Have an account?{" "}
                  <Link to={"/login"} className="lgn-btn">
                    LOGIN
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  signup: state.signup,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Signup);
