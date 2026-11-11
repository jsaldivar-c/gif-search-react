import { useState, useEffect } from 'react';
interface Props {
  /** Placeholder text of the input. */
  placeHolder?: string;
  /** Label of the search button. */
  buttonText: string;
  /** Called with the current text 700ms after the user stops typing (debounced). */
  onQuery: (query: string) => void;
  /** Called with the text when the user presses Enter or clicks the button. */
  onSubmit: (query: string) => void;
}

/**
 * Text input with a search button.
 *
 * It emits two kinds of events: a debounced `onQuery` while typing, and an
 * explicit `onSubmit` on Enter or click. After a submit the input is cleared.
 * Empty or whitespace-only text is never submitted.
 *
 * @example
 * <SearchBar buttonText="Search" onQuery={search} onSubmit={saveAndSearch} />
 */
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
