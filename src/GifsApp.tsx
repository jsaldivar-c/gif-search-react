import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';

import { useGifs } from './gifs/hooks/useGifs';

/**
 * Root component of the gif finder: search bar, search history and results.
 * All state and data fetching live in the `useGifs` hook.
 */
export const GifsApp = () => {
  const {
    gifs,
    previousSearch,
    isLoading,
    error,
    hasSearched,
    fetchGifs,
    handleSubmit,
  } = useGifs();

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
