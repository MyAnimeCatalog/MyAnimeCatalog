import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type AnimeType, type DataType } from "../../types";

const Details = () => {
  const [anime, setAnime] = useState<AnimeType | null>(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect((): void => {
    const getAnimeDetails = async (): Promise<void> => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime/${id ? id.toString() : "1"}`
        );
        const data = (await res.json()) as DataType;
        setAnime(data.data);
        if (!res.ok) {
          setAnime(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getAnimeDetails();
  }, [id]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* <p className="text-black">Anime: {id}</p> */}
      {anime && (
        <>
          <Image
            src={anime.images.jpg.image_url}
            alt="anime image"
            height={500}
            width={200}
          />
          <p>
            {anime.title_english}
            <br />
            {anime.title}
          </p>
          <span>
            <strong>Rank:</strong> {anime.rank}{" "}
          </span>
          <span>
            <strong>Score:</strong> {anime.score} (Scored by{" "}
            <em>{anime.scored_by}</em> members){" "}
          </span>
          <label for="Add-to-List">Add to List</label>
          <select name="Add-to-List">
            <option value="toWatch" selected>
              To Watch
            </option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
          <p className="w-1/2 flex-wrap">{anime.synopsis}</p>
        </>
      )}
    </main>
    // score, ranking, popularity, members
    //add to list
    //season and year?
    //genres
    //synopsis
    //image
    //broadcast day?
  );
};

export default Details;
