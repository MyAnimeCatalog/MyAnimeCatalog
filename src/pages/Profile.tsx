import {useState, useEffect} from 'react';
import { type NextPage } from "next";
import { api } from "~/utils/api";
import * as Avatar from "@radix-ui/react-avatar";
import { BsPencilFill } from "react-icons/bs";
import { IconContext } from 'react-icons';

const Profile: NextPage = () => {
  const user = api.users.getInfo.useQuery().data;
  const watched = api.animes.getList.useQuery('watched').data;
  const watchedNum = watched ? watched.length : 0;
  const toWatch = api.animes.getList.useQuery('toWatch').data;
  const toWatchNum = toWatch ? toWatch.length : 0;
  const watching = api.animes.getList.useQuery('watching').data;
  const watchingNum = watching ? watching.length : 0;
  const [ showImageModal, setShowImageModal ] = useState<boolean>(false);
  const [ pfpImage, setPfpImage ] = useState<string>('');
  const [ userImage, setUserImage ] = useState<string>('');
  
  const [showBioModal, setShowBioModal] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');
  const [userBio, setUserBio] = useState<string>('');

  
  const { mutate } = api.users.updateBio.useMutation();
  const updatePicture = api.users.updatePicture.useMutation().mutate;

  useEffect(() => {
    if (user && user.bio && user.image){
      setUserBio(user.bio);
      setUserImage(user.image);
    } else {
      setUserBio('');
      setUserImage('');
    }
  }, [user]);
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({bio: bio}); 
    setUserBio(bio);
    setShowBioModal(false);
  };

  const editPicture = (e: React.MouseEvent) => {
    e.preventDefault();
    updatePicture({image: pfpImage});
    setUserImage(pfpImage);
    setShowImageModal(false);
    
  }

  return (
    <>
      <main className="flex text-white min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-10 pt-16">
        {user &&
        <>
          <div className = 'mr-16'>
            <Avatar.Root className="AvatarRoot group relative">
              <Avatar.Image
                className="AvatarImage h-64 rounded-full border-2 border-gray-700 border-transparent hover:border-current select-none"
                src={userImage}
                alt="Profile Picture"
              />
              <div onClick = {() => setShowImageModal(!showImageModal)} className="flex flex-column absolute inset-0 h-full w-full items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-full hover:cursor-pointer">
                <IconContext.Provider value = {{ size:'20px', color: 'rgba(255,255,255,0.7)'}}>
                  <BsPencilFill/>
                </IconContext.Provider>
              </div>
            </Avatar.Root>
            {showImageModal && 
            <div className = 'z-50 top-0 right-0 flex flex-col justify-center items-center'>
              <label>Link to Picture: </label>
              <input type='text' className = 'text-black' onChange={(e) => setPfpImage(e.target.value)}/>
              <button onClick = {() => setShowImageModal(false)}>Cancel</button>
              <button onClick = {editPicture}>Submit</button>
            </div>
            }
            <div className = 'h-64 w-64 bg-slate-700 relative'>
              <h2 className = 'ml-2 mt-2 text-lg'>About Me:</h2>
              {showBioModal && <textarea className = 'py-3 px-3 bg-slate-600 h-[190px] w-full resize-none focus:outline-none' onChange={(e) => setBio(e.target.value)}>{userBio}</textarea>}
              
              {showBioModal ? 
                <div>
                  <button className = 'absolute bottom-2 left-16 select-none' onClick={() => setShowBioModal(false)}>Cancel</button>
                  <button className = 'absolute bottom-2 right-16 select-none' onClick={(e) => handleSubmit(e)}>Submit</button>
                </div> 
                : 
                <div>
                  <p className = 'py-3 px-3'>{userBio}</p>
                  <button className = 'absolute bottom-3 right-3' onClick={() => setShowBioModal(true)}><BsPencilFill/></button>
                </div>
              }
          
            </div>
          </div>
          <ul className = 'text-4xl'>
            <li>Watched: {watchedNum}</li>
            <li>To Watch: {toWatchNum}</li>
            <li>Watching: {watchingNum}</li>
            {/* Anime stats, Manga stats, Recently added
                Favorite Animes
            */}
          </ul>
        </>
        }
      </main>
    </>
  );
};

export default Profile;
