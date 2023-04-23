import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { api } from "~/utils/api";
import { type animeProps } from "../types";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import { AnimatePresence } from "framer-motion";

//This component is an Anime Card that shows up on the UI (e.g home page)
const Anime: React.FC<animeProps> = ({ anime }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { mutate } = api.animes.addAnimeToCollection.useMutation();
  const { data: sessionData } = useSession();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //Add a new anime to a list
  const handleClickAdd = (collectionType: string): void => {
    mutate({
      titleEn: anime.title,
      titleJP: anime.title_english,
      image: anime.images.jpg.image_url,
      malID: anime.mal_id.toString(),
      synopsis: anime.synopsis,
      rating: anime.rating,
      genre: (anime.genres!.length > 0 && anime.genres) ? anime.genres[0]!.name : null,
      score: anime.score,
      scored_by: anime.scored_by,
      rank: anime.rank,
      collectionType: collectionType,
    });
    toggleModal();
  };

  
  return (
    <AnimatePresence mode = "sync">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.1, 1.1, 1, 1],
        }}
        transition={{ duration: 1 }}
        className="group relative h-64 w-48 select-none">
        <Image
          src={anime.images.jpg.image_url}
          alt="anime image"
          fill={true}
          sizes="(max-width: 640px) 100vw, 640px"
          priority={true}
          className="rounded"
        />
        {/* Dropdown menu activated, give the user options to add to their lists */}
        {showModal && (
          <div className="absolute z-20 h-1/2 w-full bg-black opacity-80">
            <ul className="px-4 py-3 text-white">
              <li
                onClick={() => handleClickAdd("toWatch")}
                className="select-none py-1 hover:cursor-pointer hover:underline"
              >
                Add To Watch
              </li>
              <li
                onClick={() => handleClickAdd("watching")}
                className="select-none py-1 hover:cursor-pointer hover:underline"
              >
                Add Watching
              </li>
              <li
                onClick={() => handleClickAdd("watched")}
                className="select-none py-1 hover:cursor-pointer hover:underline"
              >
                Add Watched
              </li>
            </ul>
          </div>
        )}
        {/* Link to redirect to a details page showing more info for an anime */}
        <Link
          href={`/details/${anime.mal_id}`}
          className="flex-column absolute inset-0 z-10 h-full w-full items-start justify-start bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
        >
          {/* When you hover over the anime card, a slightly transparent gray background shows up w/ anime title */}
          {!showModal && (
            <p className="ml-2 mr-12 mt-2 object-contain font-bold text-white">
              {anime.title}
            </p>
          )}
        </Link>
        {/* Only allow user to see dropdown option if they are logged in */}
        {sessionData &&
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
        } 
      </motion.div>
    </AnimatePresence>
  );
};

export default Anime;
