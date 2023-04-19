import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useRouter } from "next/router";


const NavBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className=".text-gray-900 fixed z-10 flex h-16 w-screen items-center justify-around bg-slate-400">
      <Link
        href="/"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        Home
      </Link>
      <Link
        href="/DailySchedule"
        className="font-semibold text-black no-underline transition hover:underline"
      >
        {"Showing Today"}
      </Link>
      {sessionData ? (
        <Link
          href="/MyList"
          className="font-semibold text-black no-underline transition hover:underline"
        >
          My List
        </Link>
      ) : null}
      <AuthShowcase />
    </div>
  );
};

export default NavBar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!sessionData && router.pathname !== '/' && router.pathname !== '/DailySchedule') {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex items-center justify-center gap-4">
      {sessionData && (
        <span>
          Welcome,{" "}
          <Link className="hover:text-lightGrey" href="/Profile">
            {sessionData.user?.name?.split(` `)[0]}!
          </Link>
        </span>
      )}

      {sessionData && (
        <Link href="/Profile">
          <Avatar.Root className="AvatarRoot">
            <Avatar.Image
              className="AvatarImage h-12 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
              src={sessionData.user?.image as string}
              alt="Profile Picture"
            />
          </Avatar.Root>
        </Link>
      )}
      <button
        className="font-semibold text-black no-underline transition hover:underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
