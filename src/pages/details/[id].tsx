import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type AnimeFetchType, type FetchDataType } from "../../types";
import { api } from "~/utils/api";
import YouTube from "react-youtube";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

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

const Details = () => {
  const [anime, setAnime] = useState<AnimeFetchType | null>(null);
  const [addToList, setAddToList] = useState(false);
  const [category, setCategory] = useState("");
  const [idInCollection, setIdInCollection] = useState('');
  const { data: sessionData } = useSession();

  const mutate = api.animes.addAnimeToCollection.useMutation().mutateAsync;
  const updateCategory = api.animes.updateCategory.useMutation().mutateAsync;
  const deleteAnime = api.animes.deleteFromList.useMutation().mutateAsync;

  const toWatch = api.animes.getList.useQuery("toWatch").data;
  const watching = api.animes.getList.useQuery("watching").data;
  const watched = api.animes.getList.useQuery("watched").data;

  const router = useRouter();
  const { id } = router.query;

  

  useEffect((): void => {
    const getAnimeDetails = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${id ? id.toString() : "1"}`
        );
        const data = (await res.json()) as FetchDataType;
        setAnime(data.data);
        if (!res.ok) {
          setAnime(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getAnimeDetails();

    const checkInList = () => {
      let inList = false;
      toWatch?.forEach((animeObj) => {
        if (id?.toString() === animeObj.malID) {
          setCategory("toWatch");
          inList = true;
          setIdInCollection(animeObj.id);
        }
      });
      watching?.forEach((animeObj) => {
        if (id?.toString() === animeObj.malID) {
          setCategory("watching");
          inList = true;
          setIdInCollection(animeObj.id);
        }
      });
      watched?.forEach((animeObj) => {
        if (id?.toString() === animeObj.malID) {
          setCategory("watched");
          inList = true;
          setIdInCollection(animeObj.id);
        }
      });
      return inList;
    };

    if (checkInList() === false) setAddToList(true);

  }, [id]);

  const addToCollection = async (): void => {
    const newAnime = await mutate({
      titleEn: anime!.title,
      titleJP: anime!.title_english,
      image: anime!.images.jpg.image_url,
      malID: anime!.mal_id.toString(),
      synopsis: anime!.synopsis,
      rating: anime!.rating,
      genre: anime!.genres[0]!.name,
      score: anime!.score,
      scored_by: anime!.scored_by,
      rank: anime!.rank,
      collectionType: 'toWatch',
    });
    setAddToList(false);
    if (newAnime) setIdInCollection(newAnime.id);
    
  };


  const updateCollection = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    if (e.target.value === 'delete') {
      await deleteAnime({
        animeId: idInCollection,
        collectionType: category,
      });
      setCategory('');
      setAddToList(true);
    } else {
      await updateCategory({
        collectionType: category,
        newCollectionType: e.target.value,
        animeId: idInCollection,
      });
      setCategory(e.target.value);
    }
  };


  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex min-h-screen w-screen flex-col pt-16 pb-5 gap-1 items-center justify-start big:justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"
    >
      {anime && (
        <>
          <Image
            src={anime.images.jpg.image_url}
            alt="anime image"
            height={600}
            width={240}
            className="pt-10 pb-4"
          />
          <h1 className='text-4xl font-semibold'>
            {anime.title_english}
          </h1>
          <h2 className='text-3xl italic'>
            {anime.title}
          </h2>
          <h3 className='text-xl'>
            <span className='border-r-2'>
              <strong>Rank:</strong> {anime.rank}{" "}
            </span>
            <span className='ml-2'>
              <strong>Score:</strong> {anime.score} (Scored by{" "}
              <em>{anime.scored_by}</em> members){" "}
            </span>
          </h3>
          {sessionData && 
          <>
            {addToList ? 
              <button className='bg-slate-400 py-0.5 px-1 rounded hover:bg-slate-600' onClick={addToCollection}>Add to List</button> : 
              <div className = 'text-black'>
                <label className = 'text-white mr-5 font-semibold text-lg' htmlFor="Add-to-List">Change Category:</label>
                <select name="Add-to-List" onChange={(e) => updateCollection(e)} value={category}>
                  <option value="toWatch">
                    To Watch
                  </option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                  <option value='delete'>Delete</option>
                </select>
              </div>
            }
          </>
          }
          <p className="w-1/2 pb-3 flex-wrap text-center">{anime.synopsis}</p>
        
          <div className="pb-2">
            <YouTube videoId={anime.trailer.youtube_id} />
          </div>
        </>
      )}
    </motion.main>
  );
};

export default Details;
