import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Anime from "~/components/Anime";
import { motion } from "framer-motion";
import { type AnimeType, type topAnimes } from "../types";

// const DUMMY_ANIME: anime = {
//   mal_id: 52034,
//   url: "https://myanimelist.net/anime/52034/Oshi_no_Ko",
//   images: {
//     jpg: {
//       image_url: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
//       small_image_url:
//         "https://cdn.myanimelist.net/images/anime/1812/134736t.jpg",
//       large_image_url:
//         "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
//     },
//     webp: {
//       image_url: "https://cdn.myanimelist.net/images/anime/1812/134736.webp",
//       small_image_url:
//         "https://cdn.myanimelist.net/images/anime/1812/134736t.webp",
//       large_image_url:
//         "https://cdn.myanimelist.net/images/anime/1812/134736l.webp",
//     },
//   },
//   trailer: {
//     youtube_id: "1yXa8MAmocQ",
//     url: "https://www.youtube.com/watch?v=1yXa8MAmocQ",
//     embed_url:
//       "https://www.youtube.com/embed/1yXa8MAmocQ?enablejsapi=1&wmode=opaque&autoplay=1",
//     images: {
//       image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/default.jpg",
//       small_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/sddefault.jpg",
//       medium_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/mqdefault.jpg",
//       large_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/hqdefault.jpg",
//       maximum_image_url:
//         "https://img.youtube.com/vi/1yXa8MAmocQ/maxresdefault.jpg",
//     },
//   },
//   approved: true,
//   titles: [
//     {
//       type: "Default",
//       title: '"Oshi no Ko"',
//     },
//     {
//       type: "Synonym",
//       title: "My Star",
//     },
//     {
//       type: "Japanese",
//       title: "【推しの子】",
//     },
//     {
//       type: "English",
//       title: "[Oshi No Ko]",
//     },
//   ],
//   title: '"Oshi no Ko"',
//   title_english: "[Oshi No Ko]",
//   title_japanese: "【推しの子】",
//   title_synonyms: ["My Star"],
//   type: "TV",
//   source: "Manga",
//   episodes: 11,
//   status: "Currently Airing",
//   airing: true,
//   aired: {
//     from: "2023-04-12T00:00:00+00:00",
//     to: null,
//     prop: {
//       from: {
//         day: 12,
//         month: 4,
//         year: 2023,
//       },
//       to: {
//         day: null,
//         month: null,
//         year: null,
//       },
//     },
//     string: "Apr 12, 2023 to ?",
//   },
//   duration: "Unknown",
//   rating: "PG-13 - Teens 13 or older",
//   score: 9.26,
//   scored_by: 80571,
//   rank: 1,
//   popularity: 803,
//   members: 276278,
//   favorites: 8098,
//   synopsis:
//     "Sixteen-year-old Ai Hoshino is a talented and beautiful idol who is adored by her fans. She is the personification of a pure, young maiden. But all that glitters is not gold.\n\nGorou Amemiya is a countryside gynecologist and a big fan of Ai. So when the pregnant idol shows up at his hospital, he is beyond bewildered. Gorou promises her a safe delivery. Little does he know, an encounter with a mysterious figure would result in his untimely death—or so he thought.\n\nOpening his eyes in the lap of his beloved idol, Gorou finds that he has been reborn as Aquamarine Hoshino—Ai's newborn son! With his world turned upside down, Gorou soon learns that the world of showbiz is paved with thorns, where talent does not always beget success. Will he manage to protect Ai's smile that he loves so much with the help of an eccentric and unexpected ally? \n\n[Written by MAL Rewrite]",
//   background: null,
//   season: "spring",
//   year: 2023,
//   broadcast: {
//     day: "Wednesdays",
//     time: "23:00",
//     timezone: "Asia/Tokyo",
//     string: "Wednesdays at 23:00 (JST)",
//   },
//   producers: [
//     {
//       mal_id: 1365,
//       type: "anime",
//       name: "Shueisha",
//       url: "https://myanimelist.net/anime/producer/1365/Shueisha",
//     },
//     {
//       mal_id: 1422,
//       type: "anime",
//       name: "CyberAgent",
//       url: "https://myanimelist.net/anime/producer/1422/CyberAgent",
//     },
//     {
//       mal_id: 1696,
//       type: "anime",
//       name: "Kadokawa",
//       url: "https://myanimelist.net/anime/producer/1696/Kadokawa",
//     },
//   ],
//   licensors: [
//     {
//       mal_id: 376,
//       type: "anime",
//       name: "Sentai Filmworks",
//       url: "https://myanimelist.net/anime/producer/376/Sentai_Filmworks",
//     },
//   ],
//   studios: [
//     {
//       mal_id: 95,
//       type: "anime",
//       name: "Doga Kobo",
//       url: "https://myanimelist.net/anime/producer/95/Doga_Kobo",
//     },
//   ],
//   genres: [
//     {
//       mal_id: 8,
//       type: "anime",
//       name: "Drama",
//       url: "https://myanimelist.net/anime/genre/8/Drama",
//     },
//     {
//       mal_id: 37,
//       type: "anime",
//       name: "Supernatural",
//       url: "https://myanimelist.net/anime/genre/37/Supernatural",
//     },
//   ],
//   explicit_genres: [],
//   themes: [
//     {
//       mal_id: 72,
//       type: "anime",
//       name: "Reincarnation",
//       url: "https://myanimelist.net/anime/genre/72/Reincarnation",
//     },
//     {
//       mal_id: 75,
//       type: "anime",
//       name: "Showbiz",
//       url: "https://myanimelist.net/anime/genre/75/Showbiz",
//     },
//   ],
//   demographics: [
//     {
//       mal_id: 42,
//       type: "anime",
//       name: "Seinen",
//       url: "https://myanimelist.net/anime/genre/42/Seinen",
//     },
//   ],
// };
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
    //handle the search submission
    //send the current state of the search input as your search request
    //No submit button. User can press enter to submit search input
    console.log(`submited`);
    setEnteredSearch(``);
    inputRef && inputRef.current && inputRef.current.blur();
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
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16">
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Top Seasonal Animes
        </h2>
        <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-6 md:overflow-auto">
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
          className="min-h-1/2 flex flex-col items-center justify-start pt-16"
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

            <div className="container flex flex-wrap items-center justify-center gap-12 bg-white px-40 py-6 md:overflow-auto">
              RED RED RED
            </div>
          </form>
          <div className="container flex flex-wrap items-center justify-center gap-12 px-20 py-6 md:overflow-auto">
            {/* <Anime key={1} anime={DUMMY_ANIME} />
            <Anime key={2} anime={DUMMY_ANIME} />
            <Anime key={3} anime={DUMMY_ANIME} />
            <Anime key={4} anime={DUMMY_ANIME} /> */}
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Home;
