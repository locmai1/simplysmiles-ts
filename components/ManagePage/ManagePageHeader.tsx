import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

type ManagePageHeaderProps = {
  adminError: boolean;
  showListView: boolean;
  setShowListView: Dispatch<SetStateAction<boolean>>;
  setShowAddHomeModal: Dispatch<SetStateAction<boolean>>;
  setShowAddParentModal: Dispatch<SetStateAction<boolean>>;
};

const ManagePageHeader = ({
  adminError,
  showListView,
  setShowListView,
  setShowAddHomeModal,
  setShowAddParentModal,
}: ManagePageHeaderProps) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between h-10">
        <span className="text-4xl font-bold text-dark-gray">
          Manage accounts
        </span>
        {!adminError && (
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
              <span className="text-dark-gray text-base font-bold">
                Add parent
              </span>
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
              <span className="text-dark-gray text-base font-bold">
                Add home
              </span>
            </button>
          </div>
        )}
      </div>

      {!adminError && (
        <div className="w-full h-10 mt-[52px] flex flex-row justify-between">
          <div className="relative w-[495px] h-10 flex flex-row items-center z-0">
            <Image
              className="absolute ml-6"
              src={"/manage/search.svg"}
              alt="magnifying glass"
              width={24}
              height={24}
              priority={true}
            />
            <input
              type="text"
              className="border-[1px] rounded-[50px] px-14 border-light-gray text-dark-gray w-full h-full"
              placeholder="Search"
            />
          </div>

          <div className="flex flex-row h-full w-[88px] justify-between">
            <button
              className="h-full w-10 rounded-lg"
              style={{ background: showListView ? "#C5C5C5" : "#12368E" }}
              onClick={() => setShowListView(false)}
            >
              <Image
                className="flex m-auto"
                src={"/manage/gridview.svg"}
                alt="grid view"
                width={24}
                height={24}
                priority={true}
              />
            </button>
            <button
              className="h-full w-10 rounded-lg"
              style={{ background: showListView ? "#12368E" : "#C5C5C5" }}
              onClick={() => setShowListView(true)}
            >
              <Image
                className="flex m-auto"
                src={"/manage/listview.svg"}
                alt="grid view"
                width={24}
                height={24}
                priority={true}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagePageHeader;
