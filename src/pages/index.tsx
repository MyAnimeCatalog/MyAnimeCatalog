import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import Anime from "~/components/Anime";

const DUMMY_ANIME: anime = {
  mal_id: 52034,
  url: "https://myanimelist.net/anime/52034/Oshi_no_Ko",
  images: {
    jpg: {
      image_url: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
      small_image_url:
        "https://cdn.myanimelist.net/images/anime/1812/134736t.jpg",
      large_image_url:
        "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
    },
    webp: {
      image_url: "https://cdn.myanimelist.net/images/anime/1812/134736.webp",
      small_image_url:
        "https://cdn.myanimelist.net/images/anime/1812/134736t.webp",
      large_image_url:
        "https://cdn.myanimelist.net/images/anime/1812/134736l.webp",
    },
  },
  trailer: {
    youtube_id: "1yXa8MAmocQ",
    url: "https://www.youtube.com/watch?v=1yXa8MAmocQ",
    embed_url:
      "https://www.youtube.com/embed/1yXa8MAmocQ?enablejsapi=1&wmode=opaque&autoplay=1",
    images: {
      image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/default.jpg",
      small_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/sddefault.jpg",
      medium_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/mqdefault.jpg",
      large_image_url: "https://img.youtube.com/vi/1yXa8MAmocQ/hqdefault.jpg",
      maximum_image_url:
        "https://img.youtube.com/vi/1yXa8MAmocQ/maxresdefault.jpg",
    },
  },
  approved: true,
  titles: [
    {
      type: "Default",
      title: '"Oshi no Ko"',
    },
    {
      type: "Synonym",
      title: "My Star",
    },
    {
      type: "Japanese",
      title: "【推しの子】",
    },
    {
      type: "English",
      title: "[Oshi No Ko]",
    },
  ],
  title: '"Oshi no Ko"',
  title_english: "[Oshi No Ko]",
  title_japanese: "【推しの子】",
  title_synonyms: ["My Star"],
  type: "TV",
  source: "Manga",
  episodes: 11,
  status: "Currently Airing",
  airing: true,
  aired: {
    from: "2023-04-12T00:00:00+00:00",
    to: null,
    prop: {
      from: {
        day: 12,
        month: 4,
        year: 2023,
      },
      to: {
        day: null,
        month: null,
        year: null,
      },
    },
    string: "Apr 12, 2023 to ?",
  },
  duration: "Unknown",
  rating: "PG-13 - Teens 13 or older",
  score: 9.26,
  scored_by: 80571,
  rank: 1,
  popularity: 803,
  members: 276278,
  favorites: 8098,
  synopsis:
    "Sixteen-year-old Ai Hoshino is a talented and beautiful idol who is adored by her fans. She is the personification of a pure, young maiden. But all that glitters is not gold.\n\nGorou Amemiya is a countryside gynecologist and a big fan of Ai. So when the pregnant idol shows up at his hospital, he is beyond bewildered. Gorou promises her a safe delivery. Little does he know, an encounter with a mysterious figure would result in his untimely death—or so he thought.\n\nOpening his eyes in the lap of his beloved idol, Gorou finds that he has been reborn as Aquamarine Hoshino—Ai's newborn son! With his world turned upside down, Gorou soon learns that the world of showbiz is paved with thorns, where talent does not always beget success. Will he manage to protect Ai's smile that he loves so much with the help of an eccentric and unexpected ally? \n\n[Written by MAL Rewrite]",
  background: null,
  season: "spring",
  year: 2023,
  broadcast: {
    day: "Wednesdays",
    time: "23:00",
    timezone: "Asia/Tokyo",
    string: "Wednesdays at 23:00 (JST)",
  },
  producers: [
    {
      mal_id: 1365,
      type: "anime",
      name: "Shueisha",
      url: "https://myanimelist.net/anime/producer/1365/Shueisha",
    },
    {
      mal_id: 1422,
      type: "anime",
      name: "CyberAgent",
      url: "https://myanimelist.net/anime/producer/1422/CyberAgent",
    },
    {
      mal_id: 1696,
      type: "anime",
      name: "Kadokawa",
      url: "https://myanimelist.net/anime/producer/1696/Kadokawa",
    },
  ],
  licensors: [
    {
      mal_id: 376,
      type: "anime",
      name: "Sentai Filmworks",
      url: "https://myanimelist.net/anime/producer/376/Sentai_Filmworks",
    },
  ],
  studios: [
    {
      mal_id: 95,
      type: "anime",
      name: "Doga Kobo",
      url: "https://myanimelist.net/anime/producer/95/Doga_Kobo",
    },
  ],
  genres: [
    {
      mal_id: 8,
      type: "anime",
      name: "Drama",
      url: "https://myanimelist.net/anime/genre/8/Drama",
    },
    {
      mal_id: 37,
      type: "anime",
      name: "Supernatural",
      url: "https://myanimelist.net/anime/genre/37/Supernatural",
    },
  ],
  explicit_genres: [],
  themes: [
    {
      mal_id: 72,
      type: "anime",
      name: "Reincarnation",
      url: "https://myanimelist.net/anime/genre/72/Reincarnation",
    },
    {
      mal_id: 75,
      type: "anime",
      name: "Showbiz",
      url: "https://myanimelist.net/anime/genre/75/Showbiz",
    },
  ],
  demographics: [
    {
      mal_id: 42,
      type: "anime",
      name: "Seinen",
      url: "https://myanimelist.net/anime/genre/42/Seinen",
    },
  ],
};

interface jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface images {
  jpg: jpg;
}

interface anime {
  mal_id: number;
  rank: number;
  title: string;
  url: string;
  images: images;
  type: string;
  episodes: number | null;
  start_date: string;
  end_date: string | null;
  members: number;
  score: number;
}

interface topAnimes {
  pagination: object;
  data: anime[];
}

const Home: NextPage = () => {
  const [topSeasonAnimes, setTopSeasonAnimes] = useState<anime[]>([]);
  const [enteredSearch, setEnteredSearch] = useState(``);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect((): void => {
    const getTopSeasonAnimes = async (): Promise<void> => {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&page=1&limit=18"
        );
        const data = (await res.json()) as topAnimes;
        setTopSeasonAnimes(data.data);
        if (!res.ok) {
          setTopSeasonAnimes([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    void getTopSeasonAnimes();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //handle the search submission
    //send the current state of the search input as your search request
    //No submit button. User can press enter to submit search input
    console.log(`submited`);
    setEnteredSearch(``);
    inputRef && inputRef.current && inputRef.current.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Anime List</title>
        <meta name="description" content="Daniel's Anime List App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16">
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white">
          Top Seasonal Animes
        </h2>
        <div className="container flex flex-wrap items-center justify-center gap-12 px-4 py-6 md:overflow-auto">
          {topSeasonAnimes.length > 0 &&
            topSeasonAnimes.map((anime) => (
              <Anime key={anime.title} anime={anime} />
            ))}
        </div>
      </main>
      <section
        id="search"
        className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16"
      >
        <form
          className="flex w-4/5 flex-col items-center justify-center"
          action=""
          onSubmit={handleSearchSubmit}
        >
          <input
            className="mb-10 flex items-center justify-center rounded px-3 py-0.5"
            type="text"
            id="search-input"
            placeholder="Search"
            onChange={handleInputChange}
            value={enteredSearch}
            ref={inputRef}
          />
        </form>
        <div className="container flex flex-wrap items-center justify-center gap-12 px-20 py-6 md:overflow-auto">
          <Anime key={1} anime={DUMMY_ANIME} />
          <Anime key={2} anime={DUMMY_ANIME} />
          <Anime key={3} anime={DUMMY_ANIME} />
          <Anime key={4} anime={DUMMY_ANIME} />
        </div>
      </section>
    </>
  );
};

export default Home;
