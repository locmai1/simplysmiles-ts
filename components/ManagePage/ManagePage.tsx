import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import AddHomeModal from "../Modals/AddHomeModal";
import AddHomeConfirmModal from "../Modals/AddHomeConfirmModal";
import EditHomeModal from "../Modals/EditHomeModal";
import EditHomeConfirmModal from "../Modals/EditHomeConfirmModal";
import DeleteHomeModal from "../Modals/DeleteHomeModal";
import DeleteHomeConfirmModal from "../Modals/DeleteHomeConfirmModal";
import AddParentModal from "../Modals/AddParentModal";

import ManagePageHeader from "./ManagePageHeader";
import ManagePageTable from "./ManagePageTable";

const ManagePage = () => {
  const [currentFosterId, setCurrentFosterId] = useState<string>("");
  const [currentFosterName, setCurrentFosterName] = useState<string>("");
  const [usersNoFosterData, setUsersNoFosterData] = useState<any>(null);
  const [usersFosterData, setUsersFosterData] = useState<any>(null);
  const [showListView, setShowListView] = useState<boolean>(true);

  const [showAddHomeModal, setShowAddHomeModal] = useState<boolean>(false);
  const [showAddHomeConfirmModal, setShowAddHomeConfirmModal] =
    useState<boolean>(false);
  const [showEditHomeModal, setShowEditHomeModal] = useState<boolean>(false);
  const [showEditHomeConfirmModal, setShowEditHomeConfirmModal] =
    useState<boolean>(false);
  const [showDeleteHomeModal, setShowDeleteHomeModal] =
    useState<boolean>(false);
  const [showDeleteHomeConfirmModal, setShowDeleteHomeConfirmModal] =
    useState<boolean>(false);
  const [showAddParentModal, setShowAddParentModal] = useState<boolean>(false);
  const [showAddParentConfirmModal, setShowAddParentConfirmModal] =
    useState<boolean>(false);

  // TODO: addparentmodal, addparentconfirmmodal
  // TODO: API route to get individual user information
  // TODO: dropdown component for foster homes in addparentmodal
  // TODO: search functionality
  const fetchUsersFosterData = async () => {
    try {
      const response = await fetch("/api/fosters/parents");
      if (response.status === 200) {
        const data = await response.json();
        setUsersFosterData(data);
      } else {
        setUsersFosterData(null);
      }
    } catch (error) {
      console.log(`failed to get users with fosters: ${error}`);
    }
  };

  const fetchUsersNoFosterData = async () => {
    try {
      const response = await fetch("/api/fosters/users");
      if (response.status === 200) {
        const data = await response.json();
        setUsersNoFosterData(data);
      } else {
        setUsersNoFosterData(null);
      }
    } catch (error) {
      console.log(`failed to get users with no fosters: ${error}`);
    }
  };

  useEffect(() => {
    fetchUsersFosterData();
    fetchUsersNoFosterData();
  }, []);

  return (
    <div className="p-16 w-full h-full flex flex-col relative">
      {showAddHomeModal && !showAddHomeConfirmModal ? (
        <AddHomeModal
          showAddHomeModal={showAddHomeModal}
          setShowAddHomeModal={setShowAddHomeModal}
          showAddHomeConfirmModal={showAddHomeConfirmModal}
          setShowAddHomeConfirmModal={setShowAddHomeConfirmModal}
        />
      ) : null}
      {!showAddHomeModal && showAddHomeConfirmModal ? (
        <AddHomeConfirmModal
          showAddHomeModal={showAddHomeModal}
          setShowAddHomeModal={setShowAddHomeModal}
          showAddHomeConfirmModal={showAddHomeConfirmModal}
          setShowAddHomeConfirmModal={setShowAddHomeConfirmModal}
        />
      ) : null}
      {showEditHomeModal && !showEditHomeConfirmModal ? (
        <EditHomeModal
          fosterHomeId={currentFosterId}
          setFosterHomeName={setCurrentFosterName}
          showEditHomeModal={showEditHomeModal}
          setShowEditHomeModal={setShowEditHomeModal}
          showEditHomeConfirmModal={showEditHomeConfirmModal}
          setShowEditHomeConfirmModal={setShowEditHomeConfirmModal}
        />
      ) : null}
      {!showEditHomeModal && showEditHomeConfirmModal ? (
        <EditHomeConfirmModal
          fosterHomeName={currentFosterName}
          showEditHomeModal={showEditHomeModal}
          setShowEditHomeModal={setShowEditHomeModal}
          showEditHomeConfirmModal={showEditHomeConfirmModal}
          setShowEditHomeConfirmModal={setShowEditHomeConfirmModal}
        />
      ) : null}
      {showDeleteHomeModal && !showDeleteHomeConfirmModal ? (
        <DeleteHomeModal
          fosterHomeId={currentFosterId}
          fosterHomeName={currentFosterName}
          showDeleteHomeModal={showDeleteHomeModal}
          setShowDeleteHomeModal={setShowDeleteHomeModal}
          showDeleteHomeConfirmModal={showDeleteHomeConfirmModal}
          setShowDeleteHomeConfirmModal={setShowDeleteHomeConfirmModal}
        />
      ) : null}
      {!showDeleteHomeModal && showDeleteHomeConfirmModal ? (
        <DeleteHomeConfirmModal
          fosterHomeName={currentFosterName}
          showDeleteHomeModal={showDeleteHomeModal}
          setShowDeleteHomeModal={setShowDeleteHomeModal}
          showDeleteHomeConfirmModal={showDeleteHomeConfirmModal}
          setShowDeleteHomeConfirmModal={setShowDeleteHomeConfirmModal}
        />
      ) : null}
      {showAddParentModal && !showAddParentConfirmModal ? (
        <AddParentModal
          showAddParentModal={showAddParentModal}
          setShowAddParentModal={setShowAddParentModal}
          showAddParentConfirmModal={showAddParentConfirmModal}
          setShowAddParentConfirmModal={setShowAddParentConfirmModal}
        />
      ) : null}

      {/* header */}
      <ManagePageHeader
        setShowAddHomeModal={setShowAddHomeModal}
        setShowAddParentModal={setShowAddParentModal}
      />

      {/* search & sort */}
      <div className="w-full h-10 mt-[52px] flex flex-row justify-between">
        {/* search bar */}
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

        {/* view control */}
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

      {/* user information */}
      <div className="w-full flex flex-col overflow-y-auto mt-12">
        {usersNoFosterData && (
          <ManagePageTable
            usersFosterData={usersNoFosterData}
            showListView={showListView}
            setCurrentFosterId={setCurrentFosterId}
            setCurrentFosterName={setCurrentFosterName}
            showHomeControls={false}
            showEditHomeModal={showEditHomeModal}
            setShowEditHomeModal={setShowEditHomeModal}
            showDeleteHomeModal={showDeleteHomeModal}
            setShowDeleteHomeModal={setShowDeleteHomeModal}
          />
        )}

        {usersFosterData &&
          Object.keys(usersFosterData).map((foster, i: number) => (
            // each home section
            <ManagePageTable
              key={i}
              usersFosterData={usersFosterData[foster]}
              showListView={showListView}
              setCurrentFosterId={setCurrentFosterId}
              setCurrentFosterName={setCurrentFosterName}
              showHomeControls={true}
              showEditHomeModal={showEditHomeModal}
              setShowEditHomeModal={setShowEditHomeModal}
              showDeleteHomeModal={showDeleteHomeModal}
              setShowDeleteHomeModal={setShowDeleteHomeModal}
            />
          ))}
      </div>
    </div>
  );
};

export default ManagePage;
