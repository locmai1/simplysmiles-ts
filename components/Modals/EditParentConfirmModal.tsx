import { useState, useEffect, Dispatch, SetStateAction } from "react";

type EditParentConfirmModalProps = {
  parentName: string;
  setShowEditParentModal: Dispatch<SetStateAction<boolean>>;
  setShowEditParentConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const EditParentConfirmModal = ({
  parentName,
  setShowEditParentModal,
  setShowEditParentConfirmModal,
}: EditParentConfirmModalProps) => {
  const handleAnother = () => {
    setShowEditParentModal(true);
    setShowEditParentConfirmModal(false);
  };

  const handleReturn = () => {
    setShowEditParentConfirmModal(false);
  };

  return (
    <>
      <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
        <div className="w-[600px] h-[212px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px] justify-between">
          <span className="font-bold text-2xl leading-6 text-dark-gray">
            {parentName} is updated
          </span>
          <div className="w-full h-10 flex flex-row justify-between">
            <button
              className="w-60 h-full bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
              onClick={handleAnother}
              type="button"
            >
              <span className="text-base leading-4 text-primary-default font-bold">
                Make another edit
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

export default EditParentConfirmModal;
