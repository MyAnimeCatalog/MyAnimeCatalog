import Image from "next/image";
import Link from 'next/link';

interface jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

interface images {
  jpg: jpg
}

interface Anime {
  mal_id: number;
  rank: number;
  title: string;
  url: string;
  images: images,
  type: string;
  episodes: number | null;
  start_date: string;
  end_date: string | null;
  members: number;
  score: number;
}

interface animeProps {
  anime: Anime
}

const Anime: React.FC<animeProps> = ({ anime }) => {

  return (
    <div className="relative group h-64 w-48" style={{ position: 'relative' }}>
      <Link href={`/AnimeDetailsPage/${anime.mal_id}`}>
        <Image
          src={anime.images.jpg.image_url}
          alt="anime image"
          fill={true}
        />
        <div className="absolute h-full w-full inset-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 flex-column items-start justify-start">
          <p className="text-white font-bold object-contain">{anime.title}</p>
        </div>
      </Link>
    </div>
  );
};

export default Anime;