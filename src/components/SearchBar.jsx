import React from "react";

const Searchbar = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search for flights..."
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
