import { useState, useEffect, Dispatch, SetStateAction } from "react";

type EditHomeConfirmModalProps = {
  fosterHomeName: string;
  showEditHomeModal: boolean;
  setShowEditHomeModal: Dispatch<SetStateAction<boolean>>;
  showEditHomeConfirmModal: boolean;
  setShowEditHomeConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const EditHomeConfirmModal = ({
  fosterHomeName,
  showEditHomeModal,
  setShowEditHomeModal,
  showEditHomeConfirmModal,
  setShowEditHomeConfirmModal,
}: EditHomeConfirmModalProps) => {
  const handleAnother = () => {
    setShowEditHomeModal(!showEditHomeModal);
    setShowEditHomeConfirmModal(!showEditHomeConfirmModal);
  };

  const handleReturn = () => {
    setShowEditHomeConfirmModal(!showEditHomeConfirmModal);
  };

  return (
    <>
      {!showEditHomeModal && showEditHomeConfirmModal && (
        <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
          <div className="w-[600px] h-[212px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px] justify-between">
            <span className="font-bold text-2xl leading-6 text-dark-gray">
              {fosterHomeName} is updated
            </span>
            <div className="w-full h-10 flex flex-row justify-between">
              <button
                className="w-60 h-full bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
                onClick={handleAnother}
              >
                <span className="text-base leading-4 text-primary-default font-bold">
                  Make another edit
                </span>
              </button>
              <button
                className="h-full w-60 bg-primary-default rounded-lg flex justify-center items-center"
                onClick={handleReturn}
              >
                <span className="text-base leading-4 text-secondary-default font-bold">
                  Manage accounts
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHomeConfirmModal;
