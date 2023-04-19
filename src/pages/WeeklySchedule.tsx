import { type NextPage } from "next";
import { useState, useEffect } from "react";
import { type AnimeType, type topAnimes } from "~/types";
import { ClipLoader } from "react-spinners";
import Anime from "~/components/Anime";
import naruto from "../../public/naruto.gif";
import Image from "next/image";

const WeeklySchedule: NextPage = () => {
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

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16">
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Anime Showing Today
        </h2>
        <div className="container flex w-[1000px] flex-wrap items-center justify-center gap-12 px-4 py-6 md:overflow-auto">
          {animes.length > 0 ? (
            // <img
            //   src={naruto}
            //   alt="Loading icon"
            //   style={{ display: "block", margin: "0 auto" }}
            // />

            // animes.map(anime => (
            //   <Anime key = {anime.mal_id} anime = {anime}/>
            // ))

            // <ClipLoader color="white" />

            <Image
              src="/naruto.gif"
              alt="Loader icon"
              width={500}
              height={500}
            />
          ) : (
            // <ClipLoader color="white" />

            // <img
            //   src={naruto.toString()}
            //   alt="Loading icon"
            //   style={{ display: "block", margin: "0 auto" }}
            // />

            <Image
              src="/naruto.gif"
              alt="Loader icon"
              width={500}
              height={500}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default WeeklySchedule;
