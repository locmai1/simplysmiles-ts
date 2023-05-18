import Image from "next/image";
// import { Inter } from 'next/font/google'
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
// import { useSession } from "next-auth/react";

// const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export default function Home() {
  // const { data: session } = useSession();

  return (
    <main
      className={`flex flex-col min-h-screen min-w-screen ${montserrat.className}`}
    >
      <Navbar />
    </main>
  );
}
