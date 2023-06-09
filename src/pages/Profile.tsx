import { useState, useEffect } from "react";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import * as Avatar from "@radix-ui/react-avatar";
import { BsPencilFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import Image from "next/image";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

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

const Profile: NextPage = () => {
  //get all data for user's anime lists & profile info (could also use useSession hook for some of this)
  const user = api.users.getInfo.useQuery().data;
  const watched = api.animes.getList.useQuery("watched").data;
  const watchedNum = watched ? watched.length : 0;
  const toWatch = api.animes.getList.useQuery("toWatch").data;
  const toWatchNum = toWatch ? toWatch.length : 0;
  const watching = api.animes.getList.useQuery("watching").data;
  const watchingNum = watching ? watching.length : 0;

  //Image states
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [pfpImage, setPfpImage] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");

  //Bio states
  const [showBioModal, setShowBioModal] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");

  //use these to update Bio & picture in the DB
  const { mutate } = api.users.updateBio.useMutation();
  const updatePicture = api.users.updatePicture.useMutation().mutate;

  //Set user bio and image initially
  useEffect(() => {
    if (user) {
      if (user.bio) setUserBio(user.bio);
      else setUserBio("");
      if (user.image) setUserImage(user.image);
      else setUserImage("");
    }
  }, [user]);

  //Submit for bio change
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ bio: bio });
    setUserBio(bio);
    setShowBioModal(false);
  };

  //Submit for picture change
  const editPicture = (e: React.MouseEvent) => {
    e.preventDefault();
    updatePicture({ image: pfpImage });
    setUserImage(pfpImage);
    setShowImageModal(false);
  };

  return (
    <>
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen flex-row flex-wrap items-center justify-evenly bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16 text-white"
      >
        <div className = "flex flex-col flex-wrap items-center justify-center">
          {user && (
            <>
              <h2 className="mb-2 pt-5 text-4xl">{user.name}</h2>
              <div>
                <Avatar.Root className="AvatarRoot group relative p">
                  <Avatar.Image
                    className="AvatarImage h-64 select-none rounded-full border-2 border-gray-700 border-transparent hover:border-current"
                    src={userImage}
                    alt="Profile Picture"
                  />
                  <div
                    onClick={() => setShowImageModal(!showImageModal)}
                    className="flex-column absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:cursor-pointer group-hover:opacity-100"
                  >
                    <IconContext.Provider
                      value={{ size: "20px", color: "rgba(255,255,255,0.7)" }}
                    >
                      <BsPencilFill />
                    </IconContext.Provider>
                  </div>
                </Avatar.Root>
                {showImageModal && (
                  <div className="right-0 top-0 z-50 flex flex-col items-center justify-center">
                    <label>Link to Picture: </label>
                    <input
                      type="text"
                      className="text-black"
                      onChange={(e) => setPfpImage(e.target.value)}
                    />
                    <button onClick={() => setShowImageModal(false)}>
                      Cancel
                    </button>
                    <button onClick={editPicture}>Submit</button>
                  </div>
                )}
                <div className="relative mb-6 mt-6 h-64 w-64 bg-slate-700 px-3 py-3 bg-opacity-50 shadow-lg rounded">
                  <h2 className="ml-2 mt-2 text-lg opacity-100">About Me:</h2>
                  {showBioModal && (
                    <textarea
                      className="h-[180px] w-full resize-none bg-slate-600 px-3 py-3 bg-opacity-30 focus:outline-none"
                      onChange={(e) => setBio(e.target.value)}
                    >
                      {userBio}
                    </textarea>
                  )}

                  {showBioModal ? (
                    <div>
                      <button
                        className="absolute bottom-1 left-16 select-none"
                        onClick={() => setShowBioModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="absolute bottom-1 right-16 select-none"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="px-3 py-3">{userBio}</p>
                      <button
                        className="absolute bottom-3 right-3"
                        onClick={() => setShowBioModal(true)}
                      >
                        <BsPencilFill />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="h-[500px] w-[500px]">
          <h2 className = 'text-white text-2xl flex flex-col justify-center items-center mb-5'>Statistics</h2>
          <Doughnut
            data={{
              labels: ["To Watch", "Watching", "Watched"],
              datasets: [
                {
                  data: [toWatchNum, watchingNum, watchedNum],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={
              {
                responsive: true,
                maintainAspectRatio: true,
              } as object
            }
          />
        </div>
        <div className = 'hidden lg:block'>
          <Image src = "/gojo.gif" alt = "chainsaw man" width = {280} height = {500} className = " py-5"/>
          <Image src = "/chainsaw-man-dance.gif" alt = "chainsaw man" width = {280} height = {500} className = " py-5"/>
          <Image src = "/itachi.gif" alt = "chainsaw man" width = {280} height = {280} className = " py-5"/>
        </div>
      </motion.main>
    </>
  );
};

export default Profile;
