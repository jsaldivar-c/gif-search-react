export interface GiphyResponse {
  data: GiphyGif[];
  meta: Meta;
  pagination: Pagination;
}

export interface GiphyGif {
  type: Type;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: Rating;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: Date;
  trending_datetime: TrendingDatetime;
  images: Images;
  user?: User;
  analytics_response_payload: string;
  analytics: Analytics;
  alt_text: string;
  is_low_contrast: boolean;
}

export interface Analytics {
  onload: Onclick;
  onclick: Onclick;
  onsent: Onclick;
}

export interface Onclick {
  url: string;
}

export interface Images {
  original: FixedHeight;
  downsized: The480_WStill;
  downsized_large: The480_WStill;
  downsized_medium: The480_WStill;
  downsized_small: The4_K;
  downsized_still: The480_WStill;
  fixed_height: FixedHeight;
  fixed_height_downsampled: FixedHeight;
  fixed_height_small: FixedHeight;
  fixed_height_small_still: The480_WStill;
  fixed_height_still: The480_WStill;
  fixed_width: FixedHeight;
  fixed_width_downsampled: FixedHeight;
  fixed_width_small: FixedHeight;
  fixed_width_small_still: The480_WStill;
  fixed_width_still: The480_WStill;
  looping: Looping;
  original_still: The480_WStill;
  original_mp4: The4_K;
  preview: The4_K;
  preview_gif: The480_WStill;
  preview_webp: The480_WStill;
  hd?: The4_K;
  '480w_still': The480_WStill;
  '4k'?: The4_K;
}

export interface The480_WStill {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface The4_K {
  height?: string;
  width?: string;
  mp4_size?: string;
  mp4?: string;
}

export interface FixedHeight {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size: string;
  webp: string;
  frames?: string;
  hash?: string;
}

// CORRECCIÓN 1: interface vacía → alias de tipo.
// "interface Looping {}" aceptaba cualquier valor (0, "", true...), por eso
// ESLint la rechaza. La API devuelve un objeto vacío {}, y eso es justo lo
// que expresa Record<string, never>: un objeto sin ninguna propiedad.
export type Looping = Record<string, never>;

// CORRECCIÓN 2: enum → tipo de unión de strings.
// Tu tsconfig tiene "erasableSyntaxOnly": solo permite sintaxis que
// desaparece al compilar. Un enum genera un objeto real en JavaScript, así
// que no está permitido. Un tipo de unión ('g' | 'pg') existe solo en
// TypeScript, no genera código, y se comporta igual para validar valores.
//
// Además amplié los valores: el código original venía de UNA respuesta de
// ejemplo y solo conocía 'g' y 'pg-13', pero Giphy puede devolver otras
// clasificaciones. Un tipo demasiado estrecho "miente" sobre lo que llega.
export type Rating = 'y' | 'g' | 'pg' | 'pg-13' | 'r';

// En la muestra solo apareció '0000-00-00 00:00:00'; en realidad es una
// fecha en texto, así que string es lo honesto.
export type TrendingDatetime = string;

export type Type = 'gif' | 'sticker';

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
