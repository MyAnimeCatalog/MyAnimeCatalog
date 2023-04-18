
export interface jpg {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  }
  
export interface images {
    jpg: jpg;
  }
  
export type genres = genreObject[];
  
export interface genreObject {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }
  
export interface AnimeType {
    title: string;
    title_english: string;
    images: images;
    mal_id: number;
    synopsis: string;
    rating: string;
    genres: genres;
    score: number;
    scored_by: number;
    rank: number;
  }
  
export interface topAnimes {
    pagination: object;
    data: AnimeType[];
  }

interface animeProps {
    anime: AnimeType;
}

interface DataType{
    data: AnimeType
}