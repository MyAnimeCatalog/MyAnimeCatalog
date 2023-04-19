import { type NextPage } from "next";
import { useState, useEffect } from "react";
import { type AnimeType, type topAnimes } from "~/types";
import Anime from "~/components/Anime";
import { motion } from "framer-motion";

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

const DailySchedule: NextPage = () => {
  const [animes, setAnimes] = useState<AnimeType[]>([]);

  useEffect((): void => {
    const getWeeklySchedule = async (): Promise<void> => {
      try {
        const days: string[] = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const date: Date = new Date();
        const today: number = date.getDay();
        const dayOf: string | undefined = days[today];
        const res = await fetch(
          `https://api.jikan.moe/v4/schedules?filter=${
            dayOf ? dayOf : "Monday"
          }&sfw=true`
        );
        const data = (await res.json()) as topAnimes;
        const sortedAnimes = data.data.sort((a, b) => a.rank - b.rank);
        setAnimes(sortedAnimes.slice(0, 8));
        if (!res.ok) {
          setAnimes([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getWeeklySchedule();
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
    console.log('hello');
    return runningGifs[Math.floor(Math.random() * runningGifs.length)] || "";
  };


  return (
    <>
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16"
      >
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Anime Showing Today
        </h2>
        <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-6 md:overflow-auto">
          {animes.length > 0 ? (
            animes.map((anime) => <Anime key={anime.mal_id} anime={anime} />)
          ) : (
            <img
              src={loadingBar()}
              alt="Loading icon"
              style={{ display: "block", margin: "0 auto" }}
            />
          )}
        </div>
      </motion.main>
    </>
  );
};

export default DailySchedule;
