import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

type ManagePageHeaderProps = {
  setShowAddHomeModal: Dispatch<SetStateAction<boolean>>;
  setShowAddParentModal: Dispatch<SetStateAction<boolean>>;
};

const ManagePageHeader = ({
  setShowAddHomeModal,
  setShowAddParentModal,
}: ManagePageHeaderProps) => {
  return (
    <div className="w-full flex flex-row justify-between h-10">
      <span className="text-4xl font-bold text-dark-gray">Manage accounts</span>
      <div className="flex flex-row h-10 w-96 justify-between">
        <button
          className="h-full rounded-lg border-[1px] border-dark-gray flex flex-row justify-center items-center gap-3 w-[180px] bg-secondary-default"
          onClick={() => setShowAddParentModal(true)}
        >
          <Image
            src={"/manage/addparent.svg"}
            alt="add parent"
            width={24}
            height={24}
            priority={true}
          />
          <span className="text-dark-gray text-base font-bold">Add parent</span>
        </button>
        <button
          className="h-full rounded-lg border-[1px] border-dark-gray flex flex-row justify-center items-center gap-3 w-[180px] bg-secondary-default"
          onClick={() => setShowAddHomeModal(true)}
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
  );
};

export default ManagePageHeader;
