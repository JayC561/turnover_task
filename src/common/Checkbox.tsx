import React, { useState } from "react";

const Checkbox: React.FC<{
  label: string;
  handleCheck: () => void;
  isChecked: boolean;
}> = ({ label, handleCheck, isChecked }) => {
  const [isCheck, setIsCheck] = useState(isChecked);

  const handleChange = () => {
    handleCheck();
    setIsCheck((prev) => !prev);
  };

  return (
    <div className="checkbox-conatiner" style={{ marginBottom: "15px" }}>
      <label style={{ lineHeight: "26px" }}>
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleChange}
          style={{
            accentColor: "#333",
            fontSize: "16px",
            fontWeight: "400",
            marginRight: "6px",
          }}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
