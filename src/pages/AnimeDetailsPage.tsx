import { useRouter } from 'next/router';

const AnimeDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; // retrieve the dynamic parameter from the URL

  return (
    <div>
      <h1>Details for Anime {id}</h1>
      {/* display the details for the anime with ID {id} */}
    </div>
  );
};

export default AnimeDetailsPage;