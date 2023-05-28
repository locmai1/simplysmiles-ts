import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import AddHomeConfirmModal from "./AddHomeConfirmModal";

type AddHomeModalProps = {
  showAddHomeModal: boolean;
  setShowAddHomeModal: Dispatch<SetStateAction<boolean>>;
  showAddHomeConfirmModal: boolean;
  setShowAddHomeConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const AddHomeModal = ({
  showAddHomeModal,
  setShowAddHomeModal,
  showAddHomeConfirmModal,
  setShowAddHomeConfirmModal,
}: AddHomeModalProps) => {
  // TODO: make create call

  const handleCancel = () => {
    setShowAddHomeModal(!showAddHomeModal);
  };

  const handleConfirm = () => {
    setShowAddHomeModal(!showAddHomeModal);
    setShowAddHomeConfirmModal(!showAddHomeConfirmModal);
  };

  return (
    <>
      {showAddHomeModal && !showAddHomeConfirmModal && (
        <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0">
          <div className="w-[900px] h-[768px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px]">
            {/* title */}
            <span className="h-6 font-bold text-dark-gray text-2xl leading-6">
              Add new home
            </span>

            {/* form container */}
            <form action="" className="flex flex-col h-[492px] w-full mt-9">
              {/* form name */}
              <div className="w-full h-[68px] flex flex-col justify-between">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Name
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                  type="text"
                ></input>
              </div>
              {/* form body */}
              <div className="h-[340px] w-full mt-20">
                {/* budget header */}
                <div className="w-full h-10 flex flex-row justify-between">
                  <span className="text-2xl font-bold">
                    Set up an annual budget
                  </span>
                  <button className="h-full w-[120px] border-[1px] border-light-gray rounded-lg">
                    <div className="w-[72px] h-6 flex m-auto flex-row items-center justify-between">
                      <Image
                        src={"/manage/pickdate.svg"}
                        width={24}
                        height={24}
                        alt="date picker"
                        priority={true}
                      />
                      <span className="text-base leading-4 text-dark-gray font-bold">
                        {"2023"}
                      </span>
                    </div>
                  </button>
                </div>
                {/* form fields */}
                <div className="w-full h-[264px] flex flex-row justify-between mt-10">
                  <div className="h-full w-60 flex flex-col justify-between">
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Celebration
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Management
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Overnight Travel
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                  </div>

                  <div className="h-full w-60 flex flex-col justify-between">
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Clothes
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Education
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Recreational
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                  </div>

                  <div className="h-full w-60 flex flex-col justify-between">
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Cultural Development
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Household
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                    <div className="w-full h-[68px] flex flex-col justify-between">
                      <div className="h-4 flex flex-row">
                        <span className="text-base font-bold text-dark-gray leading-4">
                          Vehicle
                        </span>
                        <span className="text-base font-bold text-light-red leading-4">
                          &nbsp;*
                        </span>
                      </div>
                      <input
                        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4"
                        type="number"
                        placeholder="$"
                      ></input>
                    </div>
                  </div>
                </div>

                {/* form control */}
                <div className="w-full h-10 mt-20 flex flex-row justify-end gap-3">
                  <button
                    className="h-full w-60 bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
                    onClick={handleCancel}
                  >
                    <span className="text-base leading-4 text-primary-default font-bold">
                      Cancel
                    </span>
                  </button>
                  <button
                    className="h-full w-60 bg-primary-default rounded-lg flex justify-center items-center"
                    onClick={handleConfirm}
                  >
                    <span className="text-base leading-4 text-secondary-default font-bold">
                      Add home
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddHomeModal;
