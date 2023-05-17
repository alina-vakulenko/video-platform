import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search({ searchWithDebounce }) {
  const [searchParams] = useSearchParams();
  const initialInputValue = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialInputValue);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchWithDebounce(value);
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
