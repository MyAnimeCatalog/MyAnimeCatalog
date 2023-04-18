import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { api } from "~/utils/api";
import { type animeProps} from '../types';



const Anime: React.FC<animeProps> = ({ anime }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { mutate } = api.animes.addAnimeToCollection.useMutation();
  const handleClickAdd = (collectionType: string): void => {
    mutate({
      titleEn: anime.title,
      titleJP: anime.title_english,
      image: anime.images.jpg.image_url,
      malID: anime.mal_id.toString(),
      synopsis: anime.synopsis,
      rating: anime.rating,
      genre: anime.genres[0]!.name,
      score: anime.score,
      scored_by: anime.scored_by,
      rank: anime.rank,
      collectionType: collectionType,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="group relative h-64 w-48 select-none">
      <Link href={`/AnimeDetailsPage/${anime.mal_id}`}>
        <Image src={anime.images.jpg.image_url} alt="anime image" fill={true} />
        <div className="flex-column absolute inset-0 h-full w-full items-start justify-start bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          {!showModal && (
            <p className="ml-2 mr-12 mt-2 object-contain font-bold text-white">
              {anime.title}
            </p>
          )}
        </div>
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
    </div>
  );
};

export default Anime;
