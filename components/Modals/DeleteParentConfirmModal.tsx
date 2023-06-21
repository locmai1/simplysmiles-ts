import { useState, useEffect, Dispatch, SetStateAction } from "react";

type DeleteParentConfirmModalProps = {
  parentName: string;
  setShowDeleteParentConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteParentConfirmModal = ({
  parentName,
  setShowDeleteParentConfirmModal,
}: DeleteParentConfirmModalProps) => {
  const handleConfirm = () => {
    setShowDeleteParentConfirmModal(false);
  };

  return (
    <>
      <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
        <div className="w-[600px] h-[212px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px] justify-between">
          <span className="font-bold text-2xl leading-6 text-dark-gray">
            {parentName} is deleted
          </span>
          <div className="w-full h-10 flex flex-row justify-end">
            <button
              className="h-full w-60 bg-primary-default rounded-lg flex justify-center items-center"
              onClick={handleConfirm}
              type="button"
            >
              <span className="text-base leading-4 text-secondary-default font-bold">
                Close
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteParentConfirmModal;
