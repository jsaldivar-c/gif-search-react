import { useCallback, useState } from 'react';

import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';

import type { Gif } from './gifs/interfaces/gif.interface';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';

export const GifsApp = () => {
  const [previousSearch, setPreviousSearch] = useState<string[]>([
    'gow',
    'ken',
  ]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const fetchGifs = useCallback(async (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await getGifsByQuery(term);
      setGifs(result);
    } catch {
      setError('No pudimos cargar los gifs. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;
    setPreviousSearch((prev) =>
      [term, ...prev.filter((t) => t !== term)].slice(0, 6),
    );

    fetchGifs(term);
  };

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto."
      />
      <SearchBar
        onQuery={fetchGifs}
        onSubmit={handleSubmit}
        buttonText="Buscar"
        placeHolder="Buscar gifs"
      />
      <PreviousSearches
        onLabelClicked={fetchGifs}
        title="Búsquedas previas"
        searches={previousSearch}
      />
      {isLoading && <p className="status-message">Cargando...</p>}
      {error && <p className="status-message error">{error}</p>}
      {hasSearched && !isLoading && !error && gifs.length === 0 && (
        <p className="status-message">No encontramos resultados.</p>
      )}

      <GifList gifs={gifs} />
    </>
  );
};
