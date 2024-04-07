import React, { useState } from "react";

const Checkbox: React.FC<{ label: string }> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="checkbox-conatiner">
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
