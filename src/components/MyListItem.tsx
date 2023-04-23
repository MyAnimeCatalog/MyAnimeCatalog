import { type MyListAnimeDataProps } from "~/types";
import AnimeMyList from "./AnimeMyList";
import { useState } from "react";

//List item, which shows some anime details
const MyListItem: React.FC<MyListAnimeDataProps> = ({
  anime,
  activeTab,
  changeListHandler,
  deleteAnime
}): JSX.Element => {
  const [ showEnTitle, setShowEnTitle ] = useState<boolean>(true);

  const changeLanguage = () => {
    setShowEnTitle(!showEnTitle);
  };

  return (
    <div className="container flex flex-col items-start gap-5 p-4 lg:flex-row">
      <div>
        {/* <AnimeComp anime={DUMMY_ANIME} /> */}
        <AnimeMyList
          anime={anime}
          activeTab={activeTab}
          changeListHandler={changeListHandler}
          deleteAnime={deleteAnime}
        />
      </div>
      <div className="flex flex-col items-start">
        { showEnTitle ? 
          <h2 onClick = {changeLanguage} className="pb-2 text-4xl hover:underline hover:cursor-pointer select:none">{anime.titleEn}</h2>
          :
          <h2 onClick = {changeLanguage} className="pb-2 text-4xl hover:underline hover:cursor-pointer select:none">{anime.titleJP}</h2>
        } 
        <p className="pb-2 font-semibold">Score: {Number(anime.score).toFixed(2)}</p>
        <p className="h-44 overflow-y-scroll no-scrollbar px-2 py-2">{anime.synopsis}</p>
        <div></div>
      </div>
    </div>
  );
};

export default MyListItem;
