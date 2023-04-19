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

export type trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: trailerImages;
};

export type trailerImages = {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
};

export interface AnimeFetchType extends AnimeType {
  trailer: trailer;
}

export interface FetchDataType {
  data: AnimeFetchType;
}

export interface topAnimes {
  pagination: object;
  data: AnimeType[];
}

interface animeProps {
  anime: AnimeType;
}

interface DataType {
  data: AnimeType;
}

/*
{
    "id": "clgmvgbga0000ut8ho4o8f98z",
    "titleEn": "\"Oshi no Ko\"",
    "titleJP": "[Oshi No Ko]",
    "image": "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
    "malID": "52034",
    "synopsis": "Sixteen-year-old Ai Hoshino is a talented and beautiful idol who is adored by her fans. She is the personification of a pure, young maiden. But all that glitters is not gold.\n\nGorou Amemiya is a countryside gynecologist and a big fan of Ai. So when the pregnant idol shows up at his hospital, he is beyond bewildered. Gorou promises her a safe delivery. Little does he know, an encounter with a mysterious figure would result in his untimely death—or so he thought.\n\nOpening his eyes in the lap of his beloved idol, Gorou finds that he has been reborn as Aquamarine Hoshino—Ai's newborn son! With his world turned upside down, Gorou soon learns that the world of showbiz is paved with thorns, where talent does not always beget success. Will he manage to protect Ai's smile that he loves so much with the help of an eccentric and unexpected ally? \n\n[Written by MAL Rewrite]",
    "rating": "PG-13 - Teens 13 or older",
    "genre": "Drama",
    "score": "9.26",
    "scored_by": 80571,
    "rank": 1
}
*/
export type MyListAnimeDataTypes = {
  id: string;
  titleEn: string;
  titleJP: string;
  image: string;
  malID: string;
  synopsis: string;
  rating: string;
  genre: string;
  score: float;
  scored_by: number;
  rank: number;
};

export interface MyListAnimeDataProps {
  anime: MyListAnimeDataTypes;
  activeTab: string;
  changeListHandler: (
    anime: MyListAnimeDataTypes,
    activeT: string,
    targetT: string
  ) => void;
  deleteAnime: (
    animeId: string,
    activeT: string
  ) => void;
}
