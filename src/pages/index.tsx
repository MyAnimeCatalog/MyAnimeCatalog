import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Anime from "~/components/Anime";

import { api } from "~/utils/api";

interface jpg{
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface images{
  jpg: jpg
}


interface anime {
  mal_id: number;
  rank: number;
  title: string;
  url: string;
  images: images,
  type: string;
  episodes: number | null;
  start_date: string;
  end_date: string | null;
  members: number;
  score: number;
}

interface topAnimes {
  pagination: object,
  data: anime[]
}
    

const Home: NextPage = () => {
  const [ topSeasonAnimes, setTopSeasonAnimes ] = useState<anime[]>([]);
  const { mutate } = api.animes.addAnimeToCollection.useMutation();
  useEffect(() => {
    mutate({
      titleEn: 'Yo',
      titleJP: 'Yo',
      image: 'Yo',
      malID: 'Yo',
      synopsis: 'Yo',
      rating: 'Yo',
      genre: 'Yo',
      score: 1,
      scored_by: 1,
      rank: 1,
      collectionType: 'toWatch'
    });
  }, []);

  useEffect((): void => {
    const getTopSeasonAnimes = async (): Promise<void> => {
      try{
        const res = await fetch('https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=18');
        const data = await res.json() as topAnimes;
        setTopSeasonAnimes(data.data);
        if (!res.ok){
          setTopSeasonAnimes([]);
        }
      } catch(error){
        console.log(error);
      }
    };
    void getTopSeasonAnimes();
  }, []);

  return (
    <>
      <Head>
        <title>Anime List</title>
        <meta name="description" content="Daniel's Anime List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-y-auto flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-white mt-6">Top Seasonal Animes</h2>
        <div className="container flex items-center justify-center gap-12 px-4 py-6 flex-wrap">
          {topSeasonAnimes.length > 0 && topSeasonAnimes.map((anime) => (
            <Anime key = {anime.title} anime = {anime}/>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
