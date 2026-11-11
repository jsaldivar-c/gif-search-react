/** Simplified gif model used by the app (mapped from the Giphy response). */
export interface Gif {
  /** Unique Giphy identifier. */
  id: string;
  /** Human-readable title, also used as the image `alt` text. */
  title: string;
  /** URL of the original-size image. */
  url: string;
  /** Image width in pixels. */
  width: number;
  /** Image height in pixels. */
  height: number;
}
