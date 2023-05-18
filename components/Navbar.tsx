import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="h-20 w-full bg-primary-default flex justify-between">
      <Link href="/" className="w-36 h-11 flex m-auto ml-24">
        <Image
          src="/logos/simplysmiles.svg"
          height={42}
          width={148}
          alt="logo"
        />
      </Link>

      {session && session.user ? (
        <div className="h-8 w-80 flex flex-row gap-6 mr-24 my-auto justify-end">
          <span className="flex items-center justify-center my-auto">
            Welcome back, {session.user.name.split(" ")[0]}
          </span>
          <button
            className="rounded-lg h-full w-28 bg-secondary-default text-primary-default cursor-pointer text-base border-none font-bold transition-all hover:bg-secondary-hover active:scale-95 shadow-lg"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="h-8 w-28 flex justify-end my-auto mr-24">
          <button
            className="rounded-lg bg-secondary-default text-primary-default cursor-pointer text-base border-none font-extrabold transition-all hover:bg-secondary-hover active:scale-95 shadow-lg w-full h-full font"
            onClick={() => signIn("google")}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
