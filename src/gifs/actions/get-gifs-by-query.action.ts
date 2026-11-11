import { giphyApi } from '../api/giphy.api';
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

/**
 * Searches gifs in the Giphy API and maps them to the app's `Gif` model.
 *
 * @param query Search term sent to the `/search` endpoint.
 * @returns Up to 10 gifs matching the term.
 * @throws If the request fails or times out (axios error).
 */
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 10,
    },
  });
  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
