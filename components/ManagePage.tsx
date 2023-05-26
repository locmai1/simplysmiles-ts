import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import AddHomeModal from "./AddHomeModal";

const ManagePage = () => {
  const [showAddHomeModal, setShowAddHomeModal] = useState<boolean>(false);
  const [showAddParentModal, setShowAddParentModal] = useState<boolean>(false);

  return (
    <div className="p-16 w-full h-full flex flex-col relative">
      {showAddHomeModal ? <AddHomeModal /> : null}
      <div className="w-full flex flex-row justify-between h-10">
        <span className="text-4xl font-bold text-dark-gray">
          Manage accounts
        </span>
        <div className="flex flex-row h-10 w-96 justify-between">
          <button className="h-full rounded-lg border-[1px] border-dark-gray flex flex-row justify-center items-center gap-3 w-[180px]">
            <Image
              src={"/manage/addparent.svg"}
              alt="add parent"
              width={24}
              height={24}
              priority={true}
            />
            <span className="text-dark-gray text-base font-bold">
              Add parent
            </span>
          </button>
          <button
            className="h-full rounded-lg border-[1px] border-dark-gray flex flex-row justify-center items-center gap-3 w-[180px]"
            onClick={() => setShowAddHomeModal(!showAddHomeModal)}
          >
            <Image
              src={"/manage/addhome.svg"}
              alt="add home"
              width={24}
              height={24}
              priority={true}
            />
            <span className="text-dark-gray text-base font-bold">Add home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePage;
