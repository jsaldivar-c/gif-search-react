import { useCallback, useEffect, useState } from 'react';

import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';

import type { Gif } from './gifs/interfaces/gif.interface';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';

const STORAGE_KEY = 'gifs-app:previous-searches';
const INITIAL_QUERY = 'trending';
const loadPreviousSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const GifsApp = () => {
  const [previousSearch, setPreviousSearch] =
    useState<string[]>(loadPreviousSearches);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(previousSearch));
    } catch (error) {
      console.warn('No se pudo guardar el historial en localStorage:', error);
    }
  }, [previousSearch]);

  useEffect(() => {
    let ignore = false;

    getGifsByQuery(INITIAL_QUERY)
      .then((result) => {
        if (!ignore) setGifs(result);
      })
      .catch(() => {
        if (!ignore) setError('No pudimos cargar los gifs. Intenta de nuevo.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
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
