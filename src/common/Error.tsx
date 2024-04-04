import React from "react";

const Error: React.FC<{ error?: string }> = ({ error }) => {
  return (
    <span style={{ color: "#f54266", fontSize: "14px", paddingTop: "12px" }}>
      {error || "Please enter valid value"}
    </span>
  );
};

export default Error;
