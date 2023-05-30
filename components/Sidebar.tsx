import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ManagePage from "./ManagePage";

type SidebarProps = {
  currPage: React.ReactNode;
  setCurrPage: Dispatch<SetStateAction<React.ReactNode>>;
};

const Sidebar = ({ currPage, setCurrPage }: SidebarProps) => {
  const [homes, setHomes] = useState<any>(null);
  const [homesButtons, setHomesButtons] = useState<React.ReactNode[]>([]);

  // TODO: display the information about the users associated with each foster home
  useEffect(() => {
    // api call to fetch all homes, setHomes
    const fetchFostersData = async () => {
      try {
        const response = await fetch("/api/fosters");
        const fosters = await response.json();
        setHomes(fosters);
      } catch (error) {
        console.log(`failed to get foster homes: ${error}`);
      }
    };
    fetchFostersData();
  }, []);

  // TODO: build the ExpensesPage for each foster home
  useEffect(() => {
    // api call to map homes to setHomesButtons
    setHomesButtons(
      homes &&
        Object.keys(homes!).map((home, i: number) => (
          <button
            key={i}
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center pl-8"
            onClick={() => setCurrPage(<div>{homes[home].name}</div>)}
          >
            <span className="ml-2">{homes[home].name}</span>
          </button>
        ))
    );
  }, [homes]);

  return (
    <div className="w-full h-full flex flex-row text-dark-gray">
      {/* sidebar */}
      <div className="min-w-96 min-h-screen bg-light-green">
        <div className="w-full h-full pt-16 flex flex-col gap-2.5">
          <button
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center"
            onClick={() => setCurrPage(<div>Dashboard</div>)}
          >
            <Image
              src={"/sidebar/home.svg"}
              width={32}
              height={32}
              alt="home icon"
              priority={true}
            />
            <span className="ml-2">Dashboard</span>
          </button>

          {homesButtons}

          <button
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center"
            onClick={() => setCurrPage(<ManagePage />)}
          >
            <Image
              src={"/sidebar/manage.svg"}
              width={32}
              height={32}
              alt="manage icon"
              priority={true}
            />
            <span className="ml-2">Manage</span>
          </button>
        </div>
      </div>
      {/* page */}
      <div className="flex w-screen h-screen">{currPage}</div>
    </div>
  );
};

export default Sidebar;
