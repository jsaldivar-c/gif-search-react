import { useCallback, useEffect, useState } from 'react';

import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

const STORAGE_KEY = 'gifs-app:previous-searches';
const INITIAL_QUERY = 'trending';
const MAX_PREVIOUS_SEARCHES = 6;
const ERROR_MESSAGE = 'No pudimos cargar los gifs. Intenta de nuevo.';

/** Reads the search history from localStorage; returns `[]` if missing or invalid. */
const loadPreviousSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Manages gif searching, search history and the initial load.
 *
 * - On mount it loads the gifs for the `trending` term.
 * - It keeps the last 6 searches, persisted in localStorage.
 *
 * @returns Search state (`gifs`, `previousSearch`, `isLoading`, `error`,
 * `hasSearched`) and the actions `fetchGifs` and `handleSubmit`.
 *
 * @example
 * const { gifs, isLoading, handleSubmit } = useGifs();
 */
export const useGifs = () => {
  const [previousSearch, setPreviousSearch] =
    useState<string[]>(loadPreviousSearches);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Searches gifs without touching the history (used by debounce and labels).
   * @param query Search term; normalized with trim and lowercase. Empty is ignored.
   */
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
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Saves the term at the top of the history (no duplicates, max 6) and searches it.
   * @param query Search term submitted explicitly by the user.
   */
  const handleSubmit = useCallback(
    (query: string) => {
      const term = query.trim().toLowerCase();
      if (term.length === 0) return;

      setPreviousSearch((prev) =>
        [term, ...prev.filter((t) => t !== term)].slice(
          0,
          MAX_PREVIOUS_SEARCHES,
        ),
      );
      fetchGifs(term);
    },
    [fetchGifs],
  );

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
        if (!ignore) setError(ERROR_MESSAGE);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return {
    gifs,
    previousSearch,
    isLoading,
    error,
    hasSearched,
    fetchGifs,
    handleSubmit,
  };
};
