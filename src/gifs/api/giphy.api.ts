import axios from 'axios';

const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

if (!apiKey) {
  console.error(
    'Falta VITE_GIPHY_API_KEY. Copia .env.template a .env y agrega tu key.',
  );
}

export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  timeout: 8000,
  params: {
    lang: 'es',
    api_key: apiKey,
  },
});
