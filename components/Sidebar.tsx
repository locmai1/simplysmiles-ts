import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ManagePage from "./ManagePage";

type SidebarProps = {
  currPage: React.ReactNode;
  setCurrPage: Dispatch<SetStateAction<React.ReactNode>>;
};

const Sidebar = ({ currPage, setCurrPage }: SidebarProps) => {
  const [homes, setHomes] = useState<any>();
  const [homesButtons, setHomesButtons] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // api call to fetch all homes, setHomes
    // const fetchFostersData = async () => {
    //   try {
    //     const response = await fetch("/api/fosters");
    //     const fosters = await response.json();
    //     setHomes(fosters);
    //     console.log(fosters);
    //   } catch (error) {
    //     console.log("failed to get foster homes");
    //   }
    // };
    // fetchFostersData();
  }, []);

  useEffect(() => {
    // api call to map homes to setHomesButtons
  }, []);

  return (
    <div className="w-full h-full flex flex-row text-dark-gray">
      {/* sidebar */}
      <div className="w-96 bg-light-green">
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

          {/* TODO: Home Component passing in the Home Id  */}
          <button
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center pl-8"
            onClick={() => setCurrPage(<div>Home #1</div>)}
          >
            <span className="ml-2">Home #1</span>
          </button>
          {/* <button
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center pl-8"
            onClick={() => setCurrPage(<div>Home #2</div>)}
          >
            <span className="ml-2">Home #2</span>
          </button>
          <button
            className="rounded-lg transition-all select-none active:font-semibold active:scale-95 mx-24 text-left border-none text-dark-gray text-base font-normal flex flex-row h-8 w-32 justify-start items-center pl-8"
            onClick={() => setCurrPage(<div>Home #3</div>)}
          >
            <span className="ml-2">Home #3</span>
          </button> */}

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
