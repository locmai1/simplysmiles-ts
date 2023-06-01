import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
// import AddHomeConfirmModal from "./AddHomeConfirmModal";

type AddHomeModalProps = {
  showAddHomeModal: boolean;
  setShowAddHomeModal: Dispatch<SetStateAction<boolean>>;
  showAddHomeConfirmModal: boolean;
  setShowAddHomeConfirmModal: Dispatch<SetStateAction<boolean>>;
};

type FosterHome = {
  fosterName: string;
  celebrationBudget: number;
  clothesBudget: number;
  culturalBudget: number;
  managementBudget: number;
  educationBudget: number;
  householdBudget: number;
  overnightBudget: number;
  recreationBudget: number;
  vehicleBudget: number;
};

const initialFosterHome = {
  fosterName: "",
  celebrationBudget: 0,
  clothesBudget: 0,
  culturalBudget: 0,
  managementBudget: 0,
  educationBudget: 0,
  householdBudget: 0,
  overnightBudget: 0,
  recreationBudget: 0,
  vehicleBudget: 0,
};

const AddHomeModal = ({
  showAddHomeModal,
  setShowAddHomeModal,
  showAddHomeConfirmModal,
  setShowAddHomeConfirmModal,
}: AddHomeModalProps) => {
  const [error, setError] = useState<boolean>(false);
  const [fosterHomeData, setFosterHomeData] =
    useState<FosterHome>(initialFosterHome);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(fosterHomeData);
    const res = await fetch("/api/fosters/add", {
      method: "POST",
      body: JSON.stringify({
        name: fosterHomeData.fosterName,
        celebration: fosterHomeData.celebrationBudget,
        clothes: fosterHomeData.clothesBudget,
        culturalDev: fosterHomeData.culturalBudget,
        management: fosterHomeData.managementBudget,
        education: fosterHomeData.educationBudget,
        household: fosterHomeData.householdBudget,
        overnightTravel: fosterHomeData.overnightBudget,
        recreational: fosterHomeData.recreationBudget,
        vehicle: fosterHomeData.vehicleBudget,
      }),
    });
    if (res.status === 200) {
      handleConfirm();
    } else if (res.status === 400) {
      setError(!error);
    }
  };

  // TODO: re-evaluate null values in onSubmit
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // type number
    if (+event.target.value >= 0) {
      setFosterHomeData({
        ...fosterHomeData,
        [event.target.name]: +event.target.value,
      });
    }
    // type string
    else {
      setFosterHomeData({
        ...fosterHomeData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCancel = () => {
    setShowAddHomeModal(!showAddHomeModal);
  };

  const handleConfirm = () => {
    setShowAddHomeModal(!showAddHomeModal);
    setShowAddHomeConfirmModal(!showAddHomeConfirmModal);
  };

  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <>
      {showAddHomeModal && !showAddHomeConfirmModal && (
        <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
          <div className="w-[900px] h-[768px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px]">
            {/* title */}
            <span className="h-6 font-bold text-dark-gray text-2xl leading-6">
              Add new home
            </span>

            {/* form container */}
            <form
              className="flex flex-col h-[492px] w-full mt-9 justify-between"
              onSubmit={handleSubmit}
            >
              {/* form name */}
              <div className="w-full flex flex-col h-28">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Name
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                {error && (
                  <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2 mt-3">
                    <Image
                      src="/manage/warning.svg"
                      width={16}
                      height={16}
                      alt="warning"
                      priority={true}
                    />
                    <span className="text-dark-red font-semibold text-xs">
                      There is an existing home with this name
                    </span>
                  </div>
                )}
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="fosterName"
                  type="text"
                  value={fosterHomeData.fosterName}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* form body */}
              <div className="h-[340px] w-full">
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
                        {getCurrentYear()}
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="celebrationBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.celebrationBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="managementBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.managementBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="overnightBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.overnightBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="clothesBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.clothesBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="educationBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.educationBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="recreationalBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.recreationBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="culturalBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.culturalBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="householdBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.householdBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                      <div className="w-full h-10 flex flex-row relative">
                        <span className="absolute pl-4 leading-10 text-light-gray">
                          $
                        </span>
                        <input
                          className="border-[1px] border-light-gray rounded-lg w-full h-10 px-7"
                          name="vehicleBudget"
                          type="number"
                          placeholder="$"
                          value={fosterHomeData.vehicleBudget}
                          onChange={handleChange}
                          required
                        />
                      </div>
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
                    type="submit"
                    // onClick={handleSubmit}
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
