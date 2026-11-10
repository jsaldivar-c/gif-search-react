import { useState } from 'react';

import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { GifList } from './gifs/components/GifList';

import type { Gif } from './gifs/interfaces/gif.interface';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';

export const GifsApp = () => {
  const [previousSearch, setPreviousSearch] = useState(['gow', 'black']);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const handleTermClicked = async (query: string) => {
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };
  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    if (previousSearch.includes(query)) return;
    setPreviousSearch([query, ...previousSearch].slice(0, 6));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto."
      />
      <SearchBar
        onQuery={handleSearch}
        buttonText="Buscar"
        placeHolder="Buscar gifs"
      />
      <PreviousSearches
        onLabelClicked={handleTermClicked}
        title="Búsquedas previas"
        searches={previousSearch}
      />

      <GifList gifs={gifs} />
    </>
  );
};
