import React from "react";
import { MoonLoader } from "react-spinners";

const Spinner: React.FC<{}> = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MoonLoader loading={true} speedMultiplier={0.75} />
    </div>
  );
};

export default Spinner;
