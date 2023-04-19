import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import MyListItem from "~/components/MyListItem";
import { api } from "~/utils/api";
import { type MyListAnimeDataTypes } from "~/types";

const MyList: NextPage = () => {
  let toWatchData = api.animes.getList.useQuery(`toWatch`).data;
  let watchingData = api.animes.getList.useQuery(`watching`).data;
  let watchedData = api.animes.getList.useQuery(`watched`).data;

  const toWatchD = useRef([]);
  const watchingD = useRef([]);
  const watchedD = useRef([]);

  const [toWatchList, setToWatchList] = useState<MyListAnimeDataTypes[]>(
    toWatchData ? toWatchData : []
  );
  const [watchingList, setWatchingList] = useState<MyListAnimeDataTypes[]>(
    watchingData ? watchingData : []
  );
  const [watchedList, setWatchedList] = useState<MyListAnimeDataTypes[]>(
    watchedData ? watchedData : []
  );

  const [activeTab, setActiveTab] = useState("toWatch");
  const [renderedAnimeList, setRenderedAnimeList] = useState<JSX.Element[]>([]);

  const changeListHandler = (
    anime: MyListAnimeDataTypes,
    activeT: string,
    targetT: string
  ): void => {
    if (activeT === "toWatch") {
      setToWatchList(toWatchList.filter((a) => a.id !== anime.id));
      if (targetT === "watching")
        return setWatchingList([anime, ...watchingList]);
      else return setWatchedList([anime, ...watchingList]);
    } else if (activeT === "watching") {
      setToWatchList(toWatchList.filter((a) => a.id !== anime.id));
      if (targetT === "toWatch")
        return setToWatchList([anime, ...watchingList]);
      else return setWatchedList([anime, ...watchingList]);
    } else if (activeT === "watched") {
      setToWatchList(toWatchList.filter((a) => a.id !== anime.id));
      if (targetT === "toWatch")
        return setToWatchList([anime, ...watchingList]);
      else return setWatchingList([anime, ...watchingList]);
    }
  };
  // const changeListHandler = (
  //   anime: MyListAnimeDataTypes,
  //   activeT: string,
  //   targetT: string
  // ): void => {
  //   if (activeT === "toWatch") {
  //     toWatchData = toWatchData?.filter((a) => a.id !== anime.id);
  //     if (targetT === "watching" && watchingData)
  //       return (watchingData = [anime, ...watchingData]);
  //     else return setWatchedList([anime, ...watchingList]);
  //   } else if (activeT === "watching") {
  //     toWatchData = toWatchData?.filter((a) => a.id !== anime.id);
  //     if (targetT === "toWatch")
  //       return (toWatchData = [anime, ...watchingList]);
  //     else return (watchedData = [anime, ...watchingList]);
  //   } else if (activeT === "watched") {
  //     toWatchData = toWatchData?.filter((a) => a.id !== anime.id);
  //     if (targetT === "toWatch")
  //       return (toWatchData = [anime, ...watchingList]);
  //     else return (watchingData = [anime, ...watchingList]);
  //   }
  // };

  useEffect(() => {
    toWatchD.current = toWatchData;
    watchingD.current = watchingData;
    watchedD.current = watchedData;
    // console.log(`REF toWatchD IS: `, toWatchD.current);
    // console.log(`REF toWatchD IS: `, toWatchD.current);
    // console.log(`REF toWatchD IS: `, toWatchD.current);
  }, [toWatchData, watchingData, watchedData]);

  useEffect(() => {
    // let newAnimeList: JSX.Element[] = [];

    if (toWatchData && watchingData && watchedData) {
      setToWatchList(toWatchData);
      setWatchingList(watchingData);
      setWatchedList(watchedData);
      //prettier ignore
      // switch (activeTab) {
      //   case `toWatch`:
      //     newAnimeList = toWatchList?.map((anime) => (
      //       <MyListItem
      //         key={anime.malID}
      //         anime={anime}
      //         activeTab={activeTab}
      //         changeListHandler={changeListHandler}
      //       />
      //     ));
      //     break;
      //   case `watching`:
      //     newAnimeList = watchingList?.map((anime) => (
      //       <MyListItem
      //         key={anime.malID}
      //         anime={anime}
      //         activeTab={activeTab}
      //         changeListHandler={changeListHandler}
      //       />
      //     ));
      //     break;
      //   case `watched`:
      //     newAnimeList = watchedList?.map((anime) => (
      //       <MyListItem
      //         key={anime.malID}
      //         anime={anime}
      //         activeTab={activeTab}
      //         changeListHandler={changeListHandler}
      //       />
      //     ));
      //     break;
      // }
      // //setRenderedAnimeList needs to be updated with new list
      // setRenderedAnimeList(newAnimeList);
    }
  }, [
    // activeTab,
    toWatchData,
    watchingData,
    watchedData,
    // toWatchList,
    // watchedList,
    // watchingList,
  ]);

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
          {activeTab === "toWatch" &&
            toWatchList?.map((anime) => (
              <MyListItem
                key={anime.malID + "3"}
                anime={anime}
                activeTab={activeTab}
                changeListHandler={changeListHandler}
              />
            ))}
          {activeTab === "watching" &&
            watchingList?.map((anime) => (
              <MyListItem
                key={anime.malID + "2"}
                anime={anime}
                activeTab={activeTab}
                changeListHandler={changeListHandler}
              />
            ))}
          {activeTab === "watched" &&
            watchedList?.map((anime) => (
              <MyListItem
                key={anime.malID + "1"}
                anime={anime}
                activeTab={activeTab}
                changeListHandler={changeListHandler}
              />
            ))}
          {renderedAnimeList}
        </section>
      </main>
    </>
  );
};

export default MyList;
