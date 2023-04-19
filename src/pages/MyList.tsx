import { type NextPage } from "next";
import { ReactComponentElement, useEffect, useState } from "react";
import MyListItem from "~/components/MyListItem";
import { type AnimeType, type topAnimes } from "../types";
import { api } from "~/utils/api";
import { Anime } from "@prisma/client";
import AnimeComp from "~/components/Anime";

const MyList: NextPage = () => {
  const toWatchData = api.animes.getList.useQuery(`toWatch`).data;
  const watchingData = api.animes.getList.useQuery(`watching`).data;
  const watchedData = api.animes.getList.useQuery(`watched`).data;

  const [activeTab, setActiveTab] = useState("toWatch");
  const [renderedAnimeList, setRenderedAnimeList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let newAnimeList: JSX.Element[] = [];

    if (toWatchData && watchingData && watchedData) {
      switch (activeTab) {
        case `toWatch`:
          newAnimeList = toWatchData?.map((anime) => (
            <MyListItem key={anime.malID} anime={anime} />
          ));
          break;
        case `watching`:
          newAnimeList = watchingData?.map((anime) => (
            <MyListItem key={anime.malID} anime={anime} />
          ));
          break;
        case `watched`:
          newAnimeList = watchedData?.map((anime) => (
            <MyListItem key={anime.malID} anime={anime} />
          ));
          break;
      }
      //setRenderedAnimeList needs to be updated with new list
      setRenderedAnimeList(newAnimeList);
    }
  }, [activeTab, toWatchData, watchingData, watchedData]);

  const clickedToWatchHandler = (): void => {
    setActiveTab("toWatch");
  };
  const clickedWatchingHandler = (): void => {
    setActiveTab("watching");
  };
  const clickedWatchedHandler = (): void => {
    setActiveTab("watched");
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16 text-white">
        <nav className="flex justify-start gap-x-10 pt-8 text-3xl ">
          <h3
            // className="cursor-pointer hover:text-lightGrey active:underline"
            className={`cursor-pointer hover:text-lightGrey ${
              activeTab === `toWatch`
                ? `border-b-2 border-solid border-sky-500`
                : ``
            }`}
            onClick={clickedToWatchHandler}
          >
            To Watch
          </h3>
          <h3
            className={`cursor-pointer hover:text-lightGrey ${
              activeTab === `watching`
                ? `border-b-2 border-solid border-sky-500`
                : ``
            }`}
            onClick={clickedWatchingHandler}
          >
            Watching
          </h3>
          <h3
            className={`cursor-pointer hover:text-lightGrey ${
              activeTab === `watched`
                ? `border-b-2 border-solid border-sky-500`
                : ``
            }`}
            onClick={clickedWatchedHandler}
          >
            Watched
          </h3>
        </nav>
        <section className="my-5 w-2/3 bg-sky-500 py-5">
          {renderedAnimeList}
        </section>
      </main>
    </>
  );
};

export default MyList;
