import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();
  const user = api.users.getInfo.useQuery().data;
  const watchedNum = api.animes.getList.useQuery('watched').data
  console.log(watchedNum);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16">
        <h1>Profile</h1>
      </main>
    </>
  );
};

export default Profile;
