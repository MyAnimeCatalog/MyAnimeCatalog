import { type NextPage } from "next";
import { useEffect, useState } from "react";
import MyListItem from "~/components/MyListItem";
import { api } from "~/utils/api";

const MyList: NextPage = () => {
  const [activeTab, setActiveTab] = useState("");
  const toWatchData = api.animes.getList.useQuery(`toWatch`).data;
  const watchingData = api.animes.getList.useQuery(`watching`).data;
  const watchedData = api.animes.getList.useQuery(`watched`).data;
  console.log(toWatchData);

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
          <MyListItem />
          <MyListItem />
          <MyListItem />
        </section>
      </main>
    </>
  );
};

export default MyList;
