import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { type AnimeType, type DataType } from "../../types";

const Details = () => {
  const [ anime, setAnime ] = useState<AnimeType | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect((): void => {
    const getAnimeDetails = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${id ? id.toString() : '1'}`
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
  return(
    <main className = 'h-screen w-screen flex flex-col justify-center items-center'>
      <p className = 'text-black'>Anime: {id}</p>
      {anime && 
      <p className = 'text-black'>{anime.title}</p>
      
      }
    </main>
  );
};

export default Details;