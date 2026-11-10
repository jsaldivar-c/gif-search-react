import { useState, useEffect } from 'react';
interface Props {
  placeHolder?: string;
  buttonText: string;
  onQuery: (query: string) => void;
  onSubmit: (query: string) => void;
}

export const SearchBar = ({
  placeHolder = 'Buscar',
  buttonText,
  onQuery,
  onSubmit,
}: Props) => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    if (query.trim() === '') return;
    onSubmit(query);
    setQuery('');
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>{buttonText}</button>
    </div>
  );
};
