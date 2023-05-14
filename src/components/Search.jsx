import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useSearchParams } from "react-router-dom";

export default function Search({ setSearchValue }) {
  const [searchParams] = useSearchParams();
  const initialInputValue = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialInputValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    updateSearchValue(value);
  };

  return (
    <input
      className="form-control"
      type="search"
      placeholder="Search by title..."
      value={inputValue}
      onChange={handleInputChange}
      aria-label="Search"
    />
  );
}
