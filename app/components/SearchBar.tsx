// components/SearchBar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 700);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="flex relative md:ml-28">
      <input
        type="text"
        placeholder="Поиск"
        className="w-full p-2 border rounded pl-10 text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length >= 0 && (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 px-4 absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => onSearch(searchTerm)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
