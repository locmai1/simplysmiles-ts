import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import AddHomeModal from "../Modals/AddHomeModal";
import AddHomeConfirmModal from "../Modals/AddHomeConfirmModal";
import EditHomeModal from "../Modals/EditHomeModal";
import EditHomeConfirmModal from "../Modals/EditHomeConfirmModal";
import DeleteHomeModal from "../Modals/DeleteHomeModal";
import DeleteHomeConfirmModal from "../Modals/DeleteHomeConfirmModal";
import AddParentModal from "../Modals/AddParentModal";
import AddParentConfirmModal from "../Modals/AddParentConfirmModal";
import EditParentModal from "../Modals/EditParentModal";

import ManagePageHeader from "./ManagePageHeader";
import ManagePageTable from "./ManagePageTable";

const ManagePage = () => {
  const [currentFosterId, setCurrentFosterId] = useState<string>("");
  const [currentFosterName, setCurrentFosterName] = useState<string>("");
  const [currentParentId, setCurrentParentId] = useState<string>("");
  const [currentParentName, setCurrentParentName] = useState<string>("");
  const [usersNoFosterData, setUsersNoFosterData] = useState<any>(null);
  const [usersFosterData, setUsersFosterData] = useState<any>(null);
  const [showListView, setShowListView] = useState<boolean>(true);
  const [adminError, setAdminError] = useState<boolean>(false);

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
  const [showEditParentModal, setShowEditParentModal] =
    useState<boolean>(false);
  const [showEditParentConfirmModal, setShowEditParentConfirmModal] =
    useState<boolean>(false);

  // TODO: search functionality (might remove entirely)
  // TODO: API route to freeze individual user (admin)
  // TODO: hook up delete user route
  // TOOD: clean up component props
  // TODO: error types to all modals and api routes
  const fetchUsersFosterData = async () => {
    try {
      const res = await fetch("/api/fosters/parents");
      if (res.status === 200) {
        const data = await res.json();
        setAdminError(false);
        setUsersFosterData(data);
      } else {
        setAdminError(true);
        setUsersFosterData(null);
      }
    } catch (error) {
      console.log(`failed to get users with fosters: ${error}`);
    }
  };

  const fetchUsersNoFosterData = async () => {
    try {
      const res = await fetch("/api/fosters/users");
      if (res.status === 200) {
        const data = await res.json();
        setAdminError(false);
        setUsersNoFosterData(data);
      } else {
        setAdminError(true);
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
          setShowAddHomeModal={setShowAddHomeModal}
          setShowAddHomeConfirmModal={setShowAddHomeConfirmModal}
        />
      ) : null}
      {!showAddHomeModal && showAddHomeConfirmModal ? (
        <AddHomeConfirmModal
          setShowAddHomeModal={setShowAddHomeModal}
          setShowAddHomeConfirmModal={setShowAddHomeConfirmModal}
        />
      ) : null}
      {showEditHomeModal && !showEditHomeConfirmModal ? (
        <EditHomeModal
          fosterHomeId={currentFosterId}
          setFosterHomeName={setCurrentFosterName}
          setShowEditHomeModal={setShowEditHomeModal}
          setShowEditHomeConfirmModal={setShowEditHomeConfirmModal}
        />
      ) : null}
      {!showEditHomeModal && showEditHomeConfirmModal ? (
        <EditHomeConfirmModal
          fosterHomeName={currentFosterName}
          setShowEditHomeModal={setShowEditHomeModal}
          setShowEditHomeConfirmModal={setShowEditHomeConfirmModal}
        />
      ) : null}
      {showDeleteHomeModal && !showDeleteHomeConfirmModal ? (
        <DeleteHomeModal
          fosterHomeId={currentFosterId}
          fosterHomeName={currentFosterName}
          setShowDeleteHomeModal={setShowDeleteHomeModal}
          setShowDeleteHomeConfirmModal={setShowDeleteHomeConfirmModal}
        />
      ) : null}
      {!showDeleteHomeModal && showDeleteHomeConfirmModal ? (
        <DeleteHomeConfirmModal
          fosterHomeName={currentFosterName}
          setShowDeleteHomeConfirmModal={setShowDeleteHomeConfirmModal}
        />
      ) : null}
      {showAddParentModal && !showAddParentConfirmModal ? (
        <AddParentModal
          setShowAddParentModal={setShowAddParentModal}
          setShowAddParentConfirmModal={setShowAddParentConfirmModal}
        />
      ) : null}
      {!showAddParentModal && showAddParentConfirmModal ? (
        <AddParentConfirmModal
          setShowAddParentModal={setShowAddParentModal}
          setShowAddParentConfirmModal={setShowAddParentConfirmModal}
        />
      ) : null}
      {showEditParentModal && !showEditParentConfirmModal ? (
        <EditParentModal
          parentId={currentParentId}
          setParentName={setCurrentParentName}
          setShowEditParentModal={setShowEditParentModal}
          setShowEditParentConfirmModal={setShowEditParentConfirmModal}
        />
      ) : null}

      {/* header */}
      <ManagePageHeader
        adminError={adminError}
        showListView={showListView}
        setShowListView={setShowListView}
        setShowAddHomeModal={setShowAddHomeModal}
        setShowAddParentModal={setShowAddParentModal}
      />

      {/* user information */}
      <div className="w-full flex flex-col overflow-y-auto mt-5">
        {adminError && (
          <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2">
            <Image
              src="/manage/warning.svg"
              width={16}
              height={16}
              alt="warning"
              // priority={true}
            />
            <span className="text-dark-red font-semibold text-xs">
              You need to be an admin to access this information
            </span>
          </div>
        )}

        {usersNoFosterData && (
          <ManagePageTable
            usersFosterData={usersNoFosterData}
            showListView={showListView}
            showHomeControls={false}
            setCurrentFosterId={setCurrentFosterId}
            setCurrentFosterName={setCurrentFosterName}
            setCurrentParentId={setCurrentParentId}
            setCurrentParentName={setCurrentParentName}
            setShowEditHomeModal={setShowEditHomeModal}
            setShowDeleteHomeModal={setShowDeleteHomeModal}
            setShowEditParentModal={setShowEditParentModal}
          />
        )}

        {usersFosterData &&
          Object.keys(usersFosterData).map((foster, i: number) => (
            // each home section
            <ManagePageTable
              key={i}
              usersFosterData={usersFosterData[foster]}
              showListView={showListView}
              showHomeControls={true}
              setCurrentFosterId={setCurrentFosterId}
              setCurrentFosterName={setCurrentFosterName}
              setCurrentParentId={setCurrentParentId}
              setCurrentParentName={setCurrentParentName}
              setShowEditHomeModal={setShowEditHomeModal}
              setShowDeleteHomeModal={setShowDeleteHomeModal}
              setShowEditParentModal={setShowEditParentModal}
            />
          ))}
      </div>
    </div>
  );
};

export default ManagePage;
