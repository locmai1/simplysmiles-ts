import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import AddHomeModal from "./AddHomeModal";
import AddHomeConfirmModal from "./AddHomeConfirmModal";
import EditHomeModal from "./EditHomeModal";
import EditHomeConfirmModal from "./EditHomeConfirmModal";

const ManagePage = () => {
  const [currentFosterId, setCurrentFosterId] = useState<string>("");
  const [currentFosterName, setCurrentFosterName] = useState<string>("");
  const [showAddHomeModal, setShowAddHomeModal] = useState<boolean>(false);
  const [showAddHomeConfirmModal, setShowAddHomeConfirmModal] =
    useState<boolean>(false);
  const [showEditHomeModal, setShowEditHomeModal] = useState<boolean>(false);
  const [showEditHomeConfirmModal, setShowEditHomeConfirmModal] =
    useState<boolean>(false);
  const [showAddParentModal, setShowAddParentModal] = useState<boolean>(false);
  const [showAddParentConfirmModal, setShowAddParentConfirmModal] =
    useState<boolean>(false);
  const [fostersWithUsers, setFostersWithUsers] = useState<any>(null);
  const [showListView, setShowListView] = useState<boolean>(true);

  // TODO: display the information about the users associated with each foster home
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch("/api/fosters/users");
        const fostersAndUsers = await response.json();
        setFostersWithUsers(fostersAndUsers);
      } catch (error) {
        console.log(`failed to get users: ${error}`);
      }
    };
    fetchUsersData();
  }, []);

  const handleSelect = (id: string, name: string) => {
    setCurrentFosterId(id);
    setCurrentFosterName(name);
    setShowEditHomeModal(!showEditHomeModal);
  };

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
          showEditHomeModal={showEditHomeModal}
          setShowEditHomeModal={setShowEditHomeModal}
          showEditHomeConfirmModal={showEditHomeConfirmModal}
          setShowEditHomeConfirmModal={setShowEditHomeConfirmModal}
          setFosterHomeName={setCurrentFosterName}
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

      {/* header */}
      <div className="w-full flex flex-row justify-between h-10">
        <span className="text-4xl font-bold text-dark-gray">
          Manage accounts
        </span>
        <div className="flex flex-row h-10 w-96 justify-between">
          <button className="h-full rounded-lg border-[1px] border-dark-gray flex flex-row justify-center items-center gap-3 w-[180px] bg-secondary-default">
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
        {fostersWithUsers &&
          Object.keys(fostersWithUsers).map((foster, i: number) => (
            // each home section
            <div className="w-full h-full flex flex-col" key={i}>
              {/* header */}
              <div className="flex flex-row w-full h-6 justify-between">
                {/* title of home */}
                <span className="font-bold text-dark-gray text-xl leading-6">
                  {fostersWithUsers[foster].fosterName}
                </span>
                {/* home control buttons */}
                <div className="h-full w-14 justify-between flex flex-row">
                  <button
                    className="w-6 h-6"
                    onClick={() =>
                      handleSelect(
                        fostersWithUsers[foster].fosterId,
                        fostersWithUsers[foster].fosterName
                      )
                    }
                  >
                    <Image
                      src={"/manage/edit.svg"}
                      alt="edit icon"
                      width={24}
                      height={24}
                      priority={true}
                    />
                  </button>
                  <button className="w-6 h-6">
                    <Image
                      src={"/manage/delete.svg"}
                      alt="delete icon"
                      width={24}
                      height={24}
                      priority={true}
                    />
                  </button>
                </div>
              </div>
              {/* table */}
              {showListView ? (
                <table className="w-full mt-6 mb-12">
                  <thead>
                    <tr className="w-full h-[60px] bg-secondary-hover ">
                      <th className="text-left align-center text-base font-semibold text-dark-gray px-4">
                        Name
                      </th>
                      <th className="text-left align-center text-base font-semibold text-dark-gray px-4">
                        Admin
                      </th>
                      <th className="text-left align-center text-base font-semibold text-dark-gray px-4">
                        Email
                      </th>
                      <th className="text-left align-center text-base font-semibold text-dark-gray px-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fostersWithUsers[foster].users.map((user, i: number) => {
                      return (
                        <tr
                          className="w-full h-[60px] border-b-[1px] border-b-divider-gray bg-secondary-default"
                          key={i}
                        >
                          <td
                            className="text-left align-center text-base font-normal text-dark-gray px-4"
                            width={"25%"}
                          >
                            {user.name}
                          </td>
                          <td
                            className="text-left align-center text-base font-normal text-dark-gray px-4"
                            width={"25%"}
                          >
                            {user.admin ? "True" : "False"}
                          </td>
                          <td
                            className="text-left align-center text-base font-normal text-dark-gray px-4"
                            width={"25%"}
                          >
                            {user.email}
                          </td>
                          <td className="px-4 align-center" width={"25%"}>
                            <div className="flex flex-row h-6 w-[90px] justify-between">
                              <button className="h-6 w-6">
                                <Image
                                  src={"/manage/edit.svg"}
                                  alt="edit icon"
                                  width={24}
                                  height={24}
                                  priority={true}
                                />
                              </button>
                              <button className="h-6 w-6">
                                <Image
                                  src={"/manage/delete.svg"}
                                  alt="delete icon"
                                  width={24}
                                  height={24}
                                  priority={true}
                                />
                              </button>
                              <button className="h-6 w-6">
                                <Image
                                  src={"/manage/freeze.svg"}
                                  alt="freeze icon"
                                  width={24}
                                  height={24}
                                  priority={true}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div
                  className="w-full mt-6 mb-12 grid grid-cols-3 gap-6"
                  style={{
                    height:
                      Math.ceil(fostersWithUsers[foster].users.length / 3) *
                      128,
                    gridTemplateRows: Math.ceil(
                      fostersWithUsers[foster].users.length / 3
                    ),
                  }}
                >
                  {fostersWithUsers[foster].users.map((user, i: number) => {
                    return (
                      <>
                        <div
                          className="w-full h-32 border-[1px] border-divider-gray rounded-lg"
                          key={i}
                        >
                          <div className="w-full h-32 flex flex-col p-6 justify-between">
                            {/* header */}
                            <div className="w-full h-6 flex items-center justify-between">
                              <span className=" text-base leading-3 font-semibold text-primary-default">
                                {user.name}
                              </span>
                              <div className="flex flex-row h-6 w-[90px] justify-between">
                                <button className="h-6 w-6">
                                  <Image
                                    src={"/manage/edit.svg"}
                                    alt="edit icon"
                                    width={24}
                                    height={24}
                                    priority={true}
                                  />
                                </button>
                                <button className="h-6 w-6">
                                  <Image
                                    src={"/manage/delete.svg"}
                                    alt="delete icon"
                                    width={24}
                                    height={24}
                                    priority={true}
                                  />
                                </button>
                                <button className="h-6 w-6">
                                  <Image
                                    src={"/manage/freeze.svg"}
                                    alt="freeze icon"
                                    width={24}
                                    height={24}
                                    priority={true}
                                  />
                                </button>
                              </div>
                            </div>
                            {/* info */}
                            <div className="w-full h-11 flex flex-col justify-between">
                              <span className="text-base leading-4 font-normal text-dark-gray">
                                {user.admin ? "Admin" : null}
                              </span>
                              <span className="text-base leading-4 font-normal text-dark-gray">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManagePage;
