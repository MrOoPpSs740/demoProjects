import React from "react";
import Select from "react-select";

const DropdownField = ({ label, options, isMulti, onChange, value }) => {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <Select
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};

export default DropdownField;
