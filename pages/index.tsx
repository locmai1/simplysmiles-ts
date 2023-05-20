import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export default function Home() {
  const { data: session, status } = useSession({ required: true });
  const [currPage, setCurrPage] = useState<React.ReactNode>(<div>Home</div>);

  if (status === "loading") {
    return (
      <div className="min-w-screen min-h-screen bg-secondary-default flex">
        <div className="flex m-auto w-40 h-16 font-bold text-primary-default text rounded-lg text-center justify-center items-center text-2xl">
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
      <Sidebar currPage={currPage} setCurrPage={setCurrPage} />
    </main>
  );
}
