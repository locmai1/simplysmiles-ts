import { useState, useEffect, Dispatch, SetStateAction } from "react";

type AddHomeConfirmModalProps = {
  setShowAddHomeModal: Dispatch<SetStateAction<boolean>>;
  setShowAddHomeConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const AddHomeConfirmModal = ({
  setShowAddHomeModal,
  setShowAddHomeConfirmModal,
}: AddHomeConfirmModalProps) => {
  const handleAnother = () => {
    setShowAddHomeModal(true);
    setShowAddHomeConfirmModal(false);
  };

  const handleReturn = () => {
    setShowAddHomeConfirmModal(false);
  };

  return (
    <>
      <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
        <div className="w-[600px] h-[212px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px] justify-between">
          <span className="font-bold text-2xl leading-6 text-dark-gray">
            New home is added
          </span>
          <div className="w-full h-10 flex flex-row justify-between">
            <button
              className="w-60 h-full bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
              onClick={handleAnother}
              type="button"
            >
              <span className="text-base leading-4 text-primary-default font-bold">
                Add another home
              </span>
            </button>
            <button
              className="h-full w-60 bg-primary-default rounded-lg flex justify-center items-center"
              onClick={handleReturn}
              type="button"
            >
              <span className="text-base leading-4 text-secondary-default font-bold">
                Manage accounts
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHomeConfirmModal;
