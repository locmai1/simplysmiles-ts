import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

type ManagePageTableProps = {
  usersFosterData: any;
  showListView: boolean;
  showHomeControls: boolean;
  setCurrentFosterId: Dispatch<SetStateAction<string>>;
  setCurrentFosterName: Dispatch<SetStateAction<string>>;
  setCurrentParentId: Dispatch<SetStateAction<string>>;
  setCurrentParentName: Dispatch<SetStateAction<string>>;
  setShowEditHomeModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteHomeModal: Dispatch<SetStateAction<boolean>>;
  setShowEditParentModal: Dispatch<SetStateAction<boolean>>;
};

const ManagePageTable = ({
  usersFosterData,
  showListView,
  showHomeControls,
  setCurrentFosterId,
  setCurrentFosterName,
  setCurrentParentId,
  setCurrentParentName,
  setShowEditHomeModal,
  setShowDeleteHomeModal,
  setShowEditParentModal,
}: ManagePageTableProps) => {
  const handleEditHomeSelect = (id: string, name: string) => {
    setCurrentFosterId(id);
    setCurrentFosterName(name);
    setShowEditHomeModal(true);
    setShowDeleteHomeModal(false);
    setShowEditParentModal(false);
  };

  const handleDeleteHomeSelect = (id: string, name: string) => {
    setCurrentFosterId(id);
    setCurrentFosterName(name);
    setShowEditHomeModal(false);
    setShowDeleteHomeModal(true);
    setShowEditParentModal(false);
  };

  const handleEditParentSelect = (id: string, name: string) => {
    setCurrentParentId(id);
    setCurrentParentName(name);
    setShowEditHomeModal(false);
    setShowDeleteHomeModal(false);
    setShowEditParentModal(true);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <div className="flex flex-row w-full h-6 justify-between">
        {/* title of home */}
        <span className="font-bold text-dark-gray text-xl leading-6">
          {usersFosterData && usersFosterData.fosterName}
        </span>

        {showHomeControls ? (
          <div className="h-full w-14 justify-between flex flex-row">
            <button
              className="w-6 h-6"
              onClick={() =>
                handleEditHomeSelect(
                  usersFosterData.fosterId,
                  usersFosterData.fosterName
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
            <button
              className="w-6 h-6"
              onClick={() =>
                handleDeleteHomeSelect(
                  usersFosterData.fosterId,
                  usersFosterData.fosterName
                )
              }
            >
              <Image
                src={"/manage/delete.svg"}
                alt="delete icon"
                width={24}
                height={24}
                priority={true}
              />
            </button>
          </div>
        ) : null}
      </div>
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
            {usersFosterData &&
              usersFosterData.users.map((user, i: number) => {
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
                        <button
                          className="h-6 w-6"
                          onClick={() =>
                            handleEditParentSelect(user.userId, user.name)
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
            height: Math.ceil(usersFosterData.users.length / 3) * 128,
            // gridTemplateRows: Math.ceil(usersFosterData.users.length / 3),
          }}
        >
          {usersFosterData.users.map((user, i: number) => {
            return (
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
                      <button
                        className="h-6 w-6"
                        onClick={() =>
                          handleEditParentSelect(user.userId, user.name)
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
                      {user.admin ? "Admin" : "Parent"}
                    </span>
                    <span className="text-base leading-4 font-normal text-dark-gray">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManagePageTable;
