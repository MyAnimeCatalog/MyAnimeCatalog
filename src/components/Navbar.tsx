import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import * as Avatar from '@radix-ui/react-avatar';

const NavBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className='fixed bg-white h-16 w-screen .text-gray-900 flex items-center justify-around z-10'>
      <Link
        href="/"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        Home
      </Link>
      <Link
        href="/WeeklySchedule"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        {"Weekly Schedule"}
      </Link>
      {sessionData ? <Link
        href="/MyList"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        My List
      </Link> : null}

      <AuthShowcase />
    </div>
  );
};

export default NavBar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-4">
      {sessionData && <span>Welcome, <Link className="hover:text-lightGrey" href="/Profile">{sessionData.user?.name?.split(` `)[0]}!</Link></span>}

      {sessionData &&
        <Link href="/Profile">
          <Avatar.Root className="AvatarRoot">
            <Avatar.Image
              className="AvatarImage rounded-full h-12 border-gray-700 border-transparent border-2 hover:border-current"
              src={sessionData.user?.image as string}
              alt="Profile Picture"
            />
          </Avatar.Root>
        </Link>}
      {/* NEED TO REDIRECT TO '/' ON SIGN OUT */}
      <button
        className="font-semibold text-black no-underline transition hover:underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};