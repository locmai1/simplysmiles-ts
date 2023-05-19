import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type NavbarProps = {
  name: string;
};

const Navbar = ({ name }: NavbarProps) => {
  return (
    <nav className="h-20 w-full bg-primary-default flex justify-between">
      <Link href="/" className="w-36 h-11 flex m-auto ml-24 relative">
        <Image src="/logos/simplysmiles.svg" fill={true} alt="logo" />
      </Link>

      <div className="h-8 w-80 flex flex-row gap-6 mr-24 my-auto justify-end">
        <span className="flex items-center justify-center my-auto">
          Welcome back, {name}
        </span>
        <button
          className="rounded-lg h-full w-28 bg-secondary-default text-primary-default cursor-pointer text-base border-none font-bold transition-all hover:bg-secondary-hover active:scale-95 shadow-lg"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
