import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { HamburgerMenu } from "./HashMenu/HamburgerMenu";
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from "react-icons";


const NavBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="text-gray-900 fixed z-40 flex h-16 w-screen items-center justify-around bg-slate-200">
      <div className = "flex items-center justify-around w-2/3 xl:w-3/5">
        <Link
          href="/"
          className="font-semibold text-black no-underline transition hover:underline hidden lg:block"
        >
          Home
        </Link>
        <Link
          href="/DailySchedule"
          className="font-semibold text-black no-underline transition hover:underline hidden lg:block"
        >
          {"Showing Today"}
        </Link>
        {sessionData ? (
          <Link
            href="/MyList"
            className="font-semibold text-black no-underline transition hover:underline hidden lg:block"
          >
            My List
          </Link>
        ) : null}
        <AuthShowcase />
        <HamburgerMenu/>
        <Link href = "https://github.com/MyAnimeCatalog/MyAnimeCatalog" target="_blank" rel="noopener noreferrer">
          <IconContext.Provider value = {{size: '35px'}}>
            <AiFillGithub className = 'fixed right-10 top-4'/>
          </IconContext.Provider>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (!sessionData && router.pathname !== '/' && router.pathname !== '/DailySchedule' && !router.pathname.includes('/details')) {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="flex items-center justify-center gap-4 z-50">
      {sessionData && (
        <span>
          Welcome,{" "}
          {sessionData.user?.name?.split(` `)[0]}!
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
