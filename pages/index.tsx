import Image from "next/image";
// import { Inter } from 'next/font/google'
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

// const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export default function Home() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="w-screen h-screen bg-secondary-default flex">
        <div className="flex m-auto w-40 h-16 font-bold bg-primary-default text text-secondary-default rounded-lg text-center justify-center items-center text-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main
      className={`flex flex-col min-h-screen min-w-screen bg-secondary-default ${montserrat.className}`}
    >
      <Navbar name={session.user.name.split(" ")[0]} />
    </main>
  );
}
