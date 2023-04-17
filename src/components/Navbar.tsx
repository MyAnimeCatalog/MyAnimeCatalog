import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import * as Avatar from '@radix-ui/react-avatar';

const NavBar = () => {
  const { data: sessionData } = useSession();
  return(
    <div className = 'fixed bg-white h-16 w-screen .text-gray-900 flex items-center justify-around z-10'>
      <Link
        href = "/"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        Home
      </Link>
      <Link
        href = "/Profile"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        {sessionData ? "My Profile" : ""}
      </Link>
      <Link
        href = "/Profile"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        {sessionData ? "My List" : ""}
      </Link>
      <AuthShowcase />
    </div>
  );
};

export default NavBar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-4">
      {sessionData && <span>Welcome {sessionData.user?.name}</span>}

      {sessionData && 
    <div>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage rounded-full h-12"
          src = {sessionData.user?.image as string}
          alt="Profile Picture"
        />
      </Avatar.Root>
    </div>}
      <button
        className="font-semibold text-black no-underline transition hover:underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
);
};