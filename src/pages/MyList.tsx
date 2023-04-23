import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import MyListItem from "~/components/MyListItem";
import { api } from "~/utils/api";
import { type MyListAnimeDataTypes } from "~/types";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

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

const MyList: NextPage = () => {
  //Get all list data for specific user
  const toWatchData = api.animes.getList.useQuery(`toWatch`).data;
  const watchingData = api.animes.getList.useQuery(`watching`).data;
  const watchedData = api.animes.getList.useQuery(`watched`).data;

  //State for lists
  const [toWatchList, setToWatchList] = useState<MyListAnimeDataTypes[]>(
    toWatchData ? toWatchData : []
  );
  const [watchingList, setWatchingList] = useState<MyListAnimeDataTypes[]>(
    watchingData ? watchingData : []
  );
  const [watchedList, setWatchedList] = useState<MyListAnimeDataTypes[]>(
    watchedData ? watchedData : []
  );

  //Currently active tab to decide which list to show
  const [activeTab, setActiveTab] = useState("toWatch");
  
  //This function handles updating a list (moving an anime from one list to another)
  const changeListHandler = (
    anime: MyListAnimeDataTypes,
    activeT: string,
    targetT: string
  ): void => {
    if (activeT === "toWatch") {
      setToWatchList(toWatchList.filter((a) => a.id !== anime.id));
      if (targetT === "watching") return setWatchingList([anime, ...watchingList]);
      else return setWatchedList([anime, ...watchedList]);
    } else if (activeT === "watching") {
      setWatchingList(watchingList.filter((a) => a.id !== anime.id));
      if (targetT === "toWatch") return setToWatchList([anime, ...toWatchList]);
      else return setWatchedList([anime, ...watchedList]);
    } else if (activeT === "watched") {
      setWatchedList(watchedList.filter((a) => a.id !== anime.id));
      if (targetT === "toWatch") return setToWatchList([anime, ...toWatchList]);
      else return setWatchingList([anime, ...watchingList]);
    }
  };

  //This handles deleting an anime from a list
  const deleteAnime = (
    animeId: string,
    activeT: string
  ): void => {
    if (activeT === "toWatch") return setToWatchList(toWatchList.filter((a) => a.id !== animeId));
    else if (activeT === "watching") return setWatchingList(watchingList.filter((a) => a.id !== animeId));
    else if (activeT === "watched") return setWatchedList(watchedList.filter((a) => a.id !== animeId));
  };

  //This sets the initial states for the anime states
  useEffect(() => {
    // let newAnimeList: JSX.Element[] = [];

    if (toWatchData && watchingData && watchedData) {
      setToWatchList(toWatchData);
      setWatchingList(watchingData);
      setWatchedList(watchedData);
     
    }
  }, [
    toWatchData,
    watchingData,
    watchedData,
  ]);

  //Set active tab when you click the tab
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
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16 text-white">
        <nav className="flex flex-col justify-start gap-x-10 pt-8 text-3xl md:flex-row">
          <h3
            // className="cursor-pointer hover:text-lightGrey active:underline"
            className={`cursor-pointer font-extrabold hover:text-lightGrey ${
              activeTab === `toWatch`
                ? `border-b-2 border-solid border-slate-300 border-opacity-60`
                : ``
            } sm: text-2xl`}
            onClick={clickedToWatchHandler}
          >
            To Watch
          </h3>
          <h3
            className={`cursor-pointer font-extrabold hover:text-lightGrey ${
              activeTab === `watching`
                ? `border-b-2 border-solid border-slate-300 border-opacity-60`
                : ``
            } sm: text-2xl`}
            onClick={clickedWatchingHandler}
          >
            Watching
          </h3>
          <h3
            className={`cursor-pointer font-extrabold hover:text-lightGrey ${
              activeTab === `watched`
                ? `border-b-2 border-solid border-slate-300 border-opacity-60`
                : ``
            } sm: text-2xl`}
            onClick={clickedWatchedHandler}
          >
            Watched
          </h3>
        </nav>
        <AnimatePresence mode = "wait" initial = {false}>
          <motion.section 
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{
              duration: 0.25,
              ease: "easeIn",
            }}
            key={activeTab}
            className="my-5 w-2/3 rounded bg-slate-300 bg-opacity-20 py-5 px-5">
            {activeTab === "toWatch" &&
              toWatchList?.map((anime) => (
                <MyListItem
                  key={anime.malID + "3"}
                  anime={anime}
                  activeTab={activeTab}
                  changeListHandler={changeListHandler}
                  deleteAnime={deleteAnime}
                />
              ))}
            {(activeTab === "toWatch" && toWatchList.length === 0) && <h2 className = 'text-2xl text-center'>List is Empty</h2>}
            {activeTab === "watching" &&
              watchingList?.map((anime) => (
                <MyListItem
                  key={anime.malID + "2"}
                  anime={anime}
                  activeTab={activeTab}
                  changeListHandler={changeListHandler}
                  deleteAnime={deleteAnime}
                />
              ))}
            {(activeTab === "watching" && watchingList.length === 0) && <h2 className = 'text-2xl text-center'>List is Empty</h2>}
            {activeTab === "watched" &&
              watchedList?.map((anime) => (
                <MyListItem
                  key={anime.malID + "1"}
                  anime={anime}
                  activeTab={activeTab}
                  changeListHandler={changeListHandler}
                  deleteAnime={deleteAnime}
                />
              ))}
            {(activeTab === "watched" && watchedList.length === 0) && <h2 className = 'text-2xl text-center'>List is Empty</h2>}
          </motion.section>
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default MyList;
