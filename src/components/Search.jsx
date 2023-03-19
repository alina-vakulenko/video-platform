import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function Search({ setSearchValue }) {
  const [inputValue, setInputValue] = useState("");

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <input
      className="w-50 form-control ms-auto"
      type="search"
      placeholder="Search"
      value={inputValue}
      onChange={handleInputChange}
      aria-label="Search"
    />
  );
}
