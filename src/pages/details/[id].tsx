import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type AnimeType, type DataType } from "../../types";

const Details = () => {
  const [anime, setAnime] = useState<AnimeType | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect((): void => {
    const getAnimeDetails = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${id ? id.toString() : "1"}`
        );
        const data = (await res.json()) as DataType;
        setAnime(data.data);
        if (!res.ok) {
          setAnime(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getAnimeDetails();
  }, [id]);
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-black">Anime: {id}</p>
      {anime && <p className="text-black">{anime.title}</p>}
      {anime && <p>{anime.title_english}</p>}
    </main>
    // score, ranking, popularity, members
    //add to list
    //season and year?
    //genres
    //synopsis
    //image
  );
};

export default Details;
