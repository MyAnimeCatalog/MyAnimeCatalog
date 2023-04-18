import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Anime from "~/components/Anime";


interface jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface images {
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
  const [topSeasonAnimes, setTopSeasonAnimes] = useState<anime[]>([]);
  const [enteredSearch, setEnteredSearch] = useState(``);

  useEffect((): void => {
    const getTopSeasonAnimes = async (): Promise<void> => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=18');
        const data = await res.json() as topAnimes;
        setTopSeasonAnimes(data.data);
        if (!res.ok) {
          setTopSeasonAnimes([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getTopSeasonAnimes();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //handle the search submission
    //send the current state of the search input as your search request
    //No submit button. User can press enter to submit search input
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Anime List</title>
        <meta name="description" content="Daniel's Anime List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-white mt-6">Top Seasonal Animes</h2>
        <div className="container flex items-center justify-center gap-12 px-4 py-6 flex-wrap md:overflow-auto">
          {topSeasonAnimes.length > 0 && topSeasonAnimes.map((anime) => (
            <Anime key={anime.title} anime={anime} />
          ))}
        </div>
      </main>
      <section id="search" className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
        <form action="" onSubmit={handleSearchSubmit}>
          <input className="flex items-center rounded px-3 py-0.5" type="text" id="search-input" placeholder="Search" onChange={handleInputChange} />
          <div className="container flex items-center justify-center gap-12 px-40 py-6 bg-white flex-wrap md:overflow-auto">
            RED RED RED
          </div>
        </form>
      </section>
    </>
  );
};

export default Home;
