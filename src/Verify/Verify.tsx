import React, { useState } from "react";
import OtpInput from "react-otp-input";

import "../css/verify.css";
import "../css/signup.css";

const Verify: React.FC<{}> = () => {
  const [otp, setOTP] = useState("");
  return (
    <div className="verify-container">
      <h1 className="verify-email">Verify your email</h1>
      <h4 style={{ fontSize: "16px", fontWeight: "400", textAlign: "center" }}>
        Enter the 8 digit code you have received on
      </h4>
      <form>
        <div>
          <label>Code</label>
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
        <div className="input-field">
          <button className="input-field-btn">VERIFY</button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
