import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { api } from "~/utils/api";
import { type MyListAnimeDataProps } from "../types";

//Component for a specific list in the My List page
const AnimeMyList: React.FC<MyListAnimeDataProps> = ({
  anime,
  activeTab,
  changeListHandler,
  deleteAnime,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const deleteAnimeApi = api.animes.deleteFromList.useMutation().mutateAsync;
  const updateCategory = api.animes.updateCategory.useMutation().mutateAsync;


  const handleClickUpdate = async (
    collectionType: string,
    newCollectionType: string
  ) => {
    const newAnime = await updateCategory({
      collectionType: collectionType,
      newCollectionType: newCollectionType,
      animeId: anime.id,
    });
    if (newAnime !== undefined && newAnime !== null){
      changeListHandler(newAnime, collectionType, newCollectionType);
    }
  };


  const handleClickDelete = async (collectionType: string) => {
    const animeObj = await deleteAnimeApi({
      animeId: anime.id,
      collectionType: collectionType,
    });
    if (animeObj !== undefined && animeObj !== null){
      deleteAnime(animeObj.animeId, collectionType);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="group relative h-64 w-48 select-none">
      <div className="relative h-64 w-48">
        <Image
          src={anime.image}
          alt="anime image"
          fill={true}
          sizes="(max-width: 640px) 100vw, 640px"
          priority={true}
          className="rounded"
        />
        {showModal && (
          <div className="absolute z-20 h-1/2 w-full bg-black opacity-80">
            <ul className="px-4 py-3 text-white">
              {activeTab !== "toWatch" && (
                <li
                  onClick={() => {
                    void handleClickUpdate(activeTab, "toWatch");
                  }}
                  className="select-none py-1 hover:cursor-pointer hover:underline"
                >
                  Add To Watch
                </li>
              )}
              {activeTab !== "watching" && (
                <li
                  onClick={() => {
                    void handleClickUpdate(activeTab, "watching");
                  }}
                  className="select-none py-1 hover:cursor-pointer hover:underline"
                >
                  Add Watching
                </li>
              )}
              {activeTab !== "watched" && (
                <li
                  onClick={() => {
                    void handleClickUpdate(activeTab, "watched");
                  }}
                  className="select-none py-1 hover:cursor-pointer hover:underline"
                >
                  Add Watched
                </li>
              )}
              <li
                onClick={() => void handleClickDelete(activeTab)}
                className="select-none py-1 hover:cursor-pointer hover:underline"
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
      <Link href={`/details/${anime.malID}`} className="flex-column absolute inset-0 h-full w-full items-start justify-start bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
        {!showModal && (
          <p className="ml-2 mr-12 mt-2 object-contain font-bold text-white">
            {anime.titleEn}
          </p>
        )}
      </Link>
      <IconContext.Provider value={{ color: "white", size: "27px" }}>
        {showModal ? (
          <AiOutlineClose
            onClick={toggleModal}
            className="absolute right-2 top-2 z-30 shadow-lg hover:cursor-pointer"
          />
        ) : (
          <AiOutlineDown
            onClick={toggleModal}
            className="absolute right-2 top-2 z-10 opacity-0 shadow-lg hover:cursor-pointer group-hover:opacity-100"
          />
        )}
      </IconContext.Provider>
    </div>
  );
};

export default AnimeMyList;
