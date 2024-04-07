import React from "react";
import { MoonLoader } from "react-spinners";

const Spinner: React.FC<{}> = () => {
  return <MoonLoader loading={true} speedMultiplier={0.75} />;
};

export default Spinner;
