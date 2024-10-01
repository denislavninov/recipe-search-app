import { useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        aria-label="Recipe search"
        placeholder="Search for recipes..."
      />
      <button onClick={handleSubmit}>Search</button>
    </form>
  );
};
