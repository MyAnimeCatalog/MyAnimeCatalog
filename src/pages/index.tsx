import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Anime from "~/components/Anime";
import { ClipLoader } from "react-spinners";

import { api } from "~/utils/api";

interface jpg{
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface images{
  jpg: jpg
}

type genres = genreObject[]

interface genreObject{
  mal_id: number
  type: string
  name: string
  url: string
}


interface Anime {
  title: string
  title_english: string
  images: images
  mal_id: number
  synopsis: string
  rating: string
  genres: genres
  score: number
  scored_by: number
  rank: number
}

interface topAnimes {
  pagination: object,
  data: Anime[]
}
    

const Home: NextPage = () => {
  const [ topSeasonAnimes, setTopSeasonAnimes ] = useState<Anime[]>([]);


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
          {topSeasonAnimes.length > 0 ? topSeasonAnimes.map((anime) => (
            <Anime key = {anime.title} anime = {anime}/>
          ))
            :
            <ClipLoader
              color='white'
            />
          }
        </div>
      </main>
    </>
  );
};

export default Home;
