import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { api } from "~/utils/api";

interface jpg{
    image_url: string
    small_image_url: string
    large_image_url: string
  }
  
  interface images{
    jpg: jpg
  }

  interface anime {
    title: string
    title_english: string
    images: images
    mal_id: number
    synopsis: string
    rating: string
    genres: genreObject[]
    score: number
    scored_by: number
    rank: number
  }

  
  interface genreObject{
    mal_id: number
    type: string
    name: string
    url: string
  }

  interface animeProps{
    anime: anime
  }

const Anime: React.FC<animeProps> = ({anime}) => {
  const [ showModal, setShowModal ] = useState<boolean>(false);
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
      collectionType: collectionType
    })
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="select-none relative group h-64 w-48">
      <Link href={`/AnimeDetailsPage/${anime.mal_id}`}>
        <Image
          src={anime.images.jpg.image_url}
          alt="anime image"
          fill = {true}
        />
        <div className="absolute h-full w-full inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 flex-column items-start justify-start">
          {!showModal && <p className="text-white font-bold object-contain mr-12 ml-2 mt-2">{anime.title}</p>}
        </div>
      </Link>
      <IconContext.Provider value = {{color: "white", size: "27px" }}>
        {showModal ? <AiOutlineClose onClick = {toggleModal} className = 'z-30 absolute top-2 right-2 shadow-lg hover:cursor-pointer'/> : <AiOutlineDown onClick = {toggleModal} className = 'opacity-0 group-hover:opacity-100 hover:cursor-pointer z-10 absolute top-2 right-2 shadow-lg'/>}
      </IconContext.Provider>
      {showModal && 
        <div className = 'w-full h-1/2 opacity-80 bg-black z-20 absolute'>
          <ul className = 'text-white py-3 px-4'>
            <li onClick = {() => handleClickAdd('toWatch')} className = 'select-none py-1 hover:underline hover:cursor-pointer'>Add To Watch</li>
            <li onClick = {() => handleClickAdd('watching')} className = 'select-none py-1 hover:underline hover:cursor-pointer'>Add Watching</li>
            <li onClick = {() => handleClickAdd('watched')} className = 'select-none py-1 hover:underline hover:cursor-pointer'>Add Watched</li>
          </ul>
        </div>
      }
      
    </div>
  );
};

export default Anime;