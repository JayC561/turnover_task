import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { mapDispatchToProps } from "../redux/actionCreators";

import "../css/verify.css";
import "../css/signup.css";
import { ConnectedProps, connect } from "react-redux";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { IState } from "../redux/reducers";
import { isLoading, isSuccess } from "../redux/util";
import Spinner from "../common/Spinner";

const Verify: React.FC<Props> = ({ verifyUser, verifyState }) => {
  const [otp, setOTP] = useState("");
  const user = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyUser({
      email: user?.email!,
      otp,
    });
  };

  useEffect(() => {
    if (isSuccess(verifyState)) {
      user?.setIsLogined(true);
      navigate("/categories");
    }
  }, [verifyState]);

  const disabledBtn = !otp || otp.length < 8;

  return (
    <>
      {isLoading(verifyState) ? (
        <Spinner />
      ) : (
        <div className="verify-container">
          <h1 className="verify-email">Verify your email</h1>
          <h4
            style={{ fontSize: "16px", fontWeight: "400", textAlign: "center" }}
          >
            Enter the 8 digit code you have received on {user?.email}
          </h4>
          <form onSubmit={handleVerify}>
            <div>
              <label style={{ marginLeft: "12px" }}>Code</label>
              <OtpInput
                value={otp}
                onChange={setOTP}
                numInputs={8}
                renderSeparator={" "}
                renderInput={(props) => (
                  <input
                    {...props}
                    onChange={(e) => {
                      const inputVal = e.target.value;
                      if (!isNaN(Number(inputVal))) {
                        props.onChange(e);
                      }
                    }}
                  />
                )}
                containerStyle={{
                  width: "100%",
                  marginTop: "7px",
                }}
                inputStyle={{
                  height: "48px",
                  width: "46px",
                  margin: "0 12px",
                  border: "1px solid #C1C1C1",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div className="input-field" style={{ marginTop: "64px" }}>
              <button
                className="input-field-btn"
                style={{
                  marginLeft: "6px",
                  marginRight: "6px",
                  cursor: disabledBtn ? "not-allowed" : "pointer",
                }}
                type={"submit"}
                disabled={disabledBtn}
              >
                VERIFY
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  verifyState: state.verify,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Verify);
