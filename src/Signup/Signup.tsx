import React from "react";
import "../css/signup.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Error from "../common/Error";

interface FormField {
  Name: string;
  Email: string;
  Password: string;
}

const Signup: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>();

  const onSubmit = (data: FormField) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="signup-container">
      <div>
        <h1 className="signup-heading">Create your account</h1>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter"
              {...register("Name", { required: true })}
            />
            {errors?.Name && <Error error={errors?.Name?.message} />}
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter"
              {...register("Email", { required: true })}
            />
            {errors?.Email && <Error error={errors?.Email?.message} />}
          </div>
          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter"
              {...register("Password", { required: true })}
            />
            {errors?.Password && <Error error={errors?.Password?.message} />}
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
  );
};

export default Signup;
