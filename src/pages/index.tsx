import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Anime from "~/components/Anime";
import { motion } from "framer-motion";
import { type AnimeType, type topAnimes } from "../types";

const pageVariants = {
  initial: {
    x: "-100vw",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.5,
    },
  },
};

const Home: NextPage = () => {
  const [topSeasonAnimes, setTopSeasonAnimes] = useState<AnimeType[]>([]);
  const [ searchAnimes, setSearchAnimes ] = useState<AnimeType[]>([]);
  const [enteredSearch, setEnteredSearch] = useState(``);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect((): void => {
    const getTopSeasonAnimes = async (): Promise<void> => {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=18"
        );
        const data = (await res.json()) as topAnimes;
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

  const loadingBar = (): string => {
    // Idealy these assets SHOULD be stored on AWS (or alternative) to avoid link breaking and so on
    const runningGifs = [
      "https://media.tenor.com/j6V8KlvWkzkAAAAC/one-punch-man-running.gif", // One Punch man
      "https://media3.giphy.com/media/JRlqKEzTDKci5JPcaL/giphy.gif", // Naruto
      "https://media.tenor.com/BF9yBwexIbMAAAAC/anime-run.gif", // School girl running from guy
      "https://i.pinimg.com/originals/d6/e6/ba/d6e6ba9290406e6c71bb379e865e7ae1.gif", // Boku No Academia
      "https://media2.giphy.com/media/CRWdhM1XgJ7Pi/giphy.gif?cid=6c09b95265acae11df6d71bcf0a2b79b2e980bdc9a571020&rid=giphy.gif&ct=g", // Spirited Away
      "https://media.tenor.com/V2FWyvBLJ0kAAAAM/anime-run-run.gif", // Haikyuu (Kageyama)
      "https://media.tenor.com/K2Mx3I6QF-QAAAAC/anime-running.gif", // Haikyuu (Kageyama and Hinata)
      "https://thumbs.gfycat.com/HelpfulDeliciousBadger-size_restricted.gif", // Little girl
      "https://i.makeagif.com/media/9-14-2020/lKjzWR.gif", // Crying school girl
      "https://64.media.tumblr.com/0a06108e630d56b5481d89951c91e99d/tumblr_otmaat1yFR1qzxv73o1_540.gif", // Dragon Ball
      "https://pa1.narvii.com/6419/9d97ae9228f4016435e3465601a8f54cfcd80d1e_00.gif", // Naruto ugly face
      "https://thumbs.gfycat.com/DisfiguredMajesticErin-max-1mb.gif", // Demon Slayer
      "https://i.pinimg.com/originals/9a/ff/f8/9afff814180b17526752338badd8d188.gif", // Black Clover
    ];

    return runningGifs[Math.floor(Math.random() * runningGifs.length)] || "";
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let str = enteredSearch;
    str = str.replace(/\s+/g, "%20");
    const url =  "https://api.jikan.moe/v4/anime?q=" + str + '&limit=8&order_by=scored_by&sort=desc';
    async function searchAnime(){
      try {
        const res = await fetch(url);
        const data = (await res.json()) as topAnimes;
        setSearchAnimes(data.data);
        if (!res.ok) {
          setSearchAnimes([]);
        }
      } catch (error) {
        console.log(error);
      }
      setEnteredSearch(``);
      inputRef && inputRef.current && inputRef.current.blur();
    }
    void searchAnime();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Anime List</title>
        <meta name="description" content="Daniel's Anime List App" />
        <link rel="icon" href="/MAC.gif" />
      </Head>
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16 overflow-hidden">
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Top Seasonal Animes
        </h2>
        <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-6 overflow-hidden">
          {topSeasonAnimes.length > 0 ? (
            topSeasonAnimes.map((anime) => (
              <Anime key={anime.title} anime={anime} />
            ))
          ) : (
            <img
              src={loadingBar()}
              alt="Loading icon"
              style={{ display: "block", margin: "0 auto" }}
            />
          )}
        </div>
        <section
          id="search"
          className="min-h-1/2 w-full flex flex-col items-center justify-start pt-16"
        >
          <form
            className="flex w-4/5 flex-col items-center justify-center"
            action=""
            onSubmit={handleSearchSubmit}
          >
            <input
              className="mb-10 flex items-center justify-center rounded px-3 py-0.5"
              type="text"
              id="search-input"
              placeholder="Search"
              onChange={handleInputChange}
              value={enteredSearch}
              ref={inputRef}
            />

            <div className="container flex flex-wrap items-center justify-center gap-12 bg-slate-300 bg-opacity-20 px-40 py-6 md:overflow-auto">
              {searchAnimes.length > 0 && searchAnimes.map((anime) => <Anime key = {anime.mal_id} anime = {anime}/>)}
            </div>
          </form>
        </section>
      </motion.main>
    </>
  );
};

export default Home;
