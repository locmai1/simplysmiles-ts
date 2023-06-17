import { useState, useEffect, Dispatch, SetStateAction } from "react";

type DeleteHomeModalProps = {
  fosterHomeId: string;
  fosterHomeName: string;
  showDeleteHomeModal: boolean;
  setShowDeleteHomeModal: Dispatch<SetStateAction<boolean>>;
  showDeleteHomeConfirmModal: boolean;
  setShowDeleteHomeConfirmModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteHomeModal = ({
  fosterHomeId,
  fosterHomeName,
  showDeleteHomeModal,
  setShowDeleteHomeModal,
  showDeleteHomeConfirmModal,
  setShowDeleteHomeConfirmModal,
}: DeleteHomeModalProps) => {
  const handleCancel = () => {
    setShowDeleteHomeModal(!showDeleteHomeModal);
  };

  const handleConfirm = async () => {
    const res = await fetch(`/api/foster/${fosterHomeId}/delete`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      setShowDeleteHomeModal(!showDeleteHomeModal);
      setShowDeleteHomeConfirmModal(!showDeleteHomeConfirmModal);
    }
  };

  return (
    <>
      {showDeleteHomeModal && !showDeleteHomeConfirmModal && (
        <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
          <div className="w-[600px] h-[212px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px] justify-between">
            <span className="font-bold text-2xl leading-6 text-dark-gray">
              Do you want to delete {fosterHomeName}?
            </span>
            <div className="w-full h-10 flex flex-row justify-between">
              <button
                className="w-60 h-full bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
                onClick={handleCancel}
                type="button"
              >
                <span className="text-base leading-4 text-primary-default font-bold">
                  Cancel
                </span>
              </button>
              <button
                className="h-full w-60 bg-primary-default rounded-lg flex justify-center items-center"
                onClick={handleConfirm}
                type="button"
              >
                <span className="text-base leading-4 text-secondary-default font-bold">
                  Confirm
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteHomeModal;
