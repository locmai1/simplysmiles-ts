import { useState, useEffect, Dispatch, SetStateAction } from "react";
import FilterDropdown from "../FilterDropdown";
import Image from "next/image";

type AddParentModalProps = {
  showAddParentModal: boolean;
  setShowAddParentModal: Dispatch<SetStateAction<boolean>>;
  showAddParentConfirmModal: boolean;
  setShowAddParentConfirmModal: Dispatch<SetStateAction<boolean>>;
};

type ParentData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  fosterName: string;
};

const AddParentModal = ({
  showAddParentModal,
  setShowAddParentModal,
  showAddParentConfirmModal,
  setShowAddParentConfirmModal,
}: AddParentModalProps) => {
  const [parentData, setParentData] = useState<ParentData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    fosterName: "",
  });
  const [fosterOptions, setFosterOptions] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<boolean>(false);

  const fetchFostersData = async () => {
    try {
      const res = await fetch(`/api/fosters`);
      const data = await res.json();
      if (data) {
        const fosterNames = Object.keys(data).map(
          (foster, i: number) => data[foster].name
        );
        setFosterOptions(fosterNames);
      }
    } catch (error) {
      console.log(`failed to fetch foster data: ${error}`);
    }
  };

  useEffect(() => {
    fetchFostersData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParentData({
      ...parentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setShowAddParentModal(false);
    setShowAddParentConfirmModal(false);
  };

  const handleConfirm = () => {
    setPasswordError(false);
    setAdminError(false);
    setEmailError(false);
    setShowAddParentModal(false);
    setShowAddParentConfirmModal(true);
  };

  const validatePassword = () => {
    if (parentData.password == parentData.passwordConfirm) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validatePassword()) {
      const res = await fetch("/api/users/add", {
        method: "POST",
        body: JSON.stringify({
          name: parentData.name,
          email: parentData.email,
          password: parentData.password,
          fosterName: parentData.fosterName,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        handleConfirm();
      } else if (res.status === 400) {
        setPasswordError(false);
        setAdminError(false);
        setEmailError(true);
      } else if (res.status === 500) {
        setPasswordError(false);
        setAdminError(true);
        setEmailError(false);
      }
    } else {
      setPasswordError(true);
      setAdminError(false);
      setEmailError(false);
    }
  };

  return (
    <>
      {showAddParentModal && !showAddParentConfirmModal && (
        <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-[2px] backdrop-brightness-75 top-0 left-0 z-50">
          <div className="w-[600px] h-[720px] flex m-auto bg-secondary-default rounded-2xl flex-col p-[50px]">
            <span className="h-6 font-bold text-dark-gray text-2xl leading-6">
              Add new parent
            </span>

            <form
              className="w-full h-[548px] flex flex-col mt-10"
              onSubmit={handleSubmit}
            >
              <div className="w-full flex flex-col h-28">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Name
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                {adminError && (
                  <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2 mt-3">
                    <Image
                      src="/manage/warning.svg"
                      width={16}
                      height={16}
                      alt="warning"
                      priority={true}
                    />
                    <span className="text-dark-red font-semibold text-xs">
                      You need to be an admin to add parents
                    </span>
                  </div>
                )}
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="name"
                  type="text"
                  value={parentData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full flex flex-col mt-5">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Home
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                {/* <select
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="fosterName"
                  value={parentData.fosterName}
                  onChange={handleSelectChange}
                  required
                >
                  {fosterOptions}
                </select> */}
                {fosterOptions && (
                  <FilterDropdown
                    items={fosterOptions}
                    onItemSelect={(idx: number, item: string) => {
                      setParentData({
                        ...parentData,
                        fosterName: item,
                      });
                    }}
                    // selectedItem={parentData.fosterName}
                  />
                )}
              </div>

              <div className="w-full flex flex-col mt-5">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Email
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                {emailError && (
                  <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2 mt-3">
                    <Image
                      src="/manage/warning.svg"
                      width={16}
                      height={16}
                      alt="warning"
                      priority={true}
                    />
                    <span className="text-dark-red font-semibold text-xs">
                      There is an existing user under that email
                    </span>
                  </div>
                )}
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="email"
                  type="email"
                  value={parentData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full flex flex-col mt-5">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Password
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                {passwordError && (
                  <div className="w-full h-8 rounded-lg flex flex-row items-center justify-start bg-light-red bg-opacity-20 px-4 gap-2 mt-3">
                    <Image
                      src="/manage/warning.svg"
                      width={16}
                      height={16}
                      alt="warning"
                      priority={true}
                    />
                    <span className="text-dark-red font-semibold text-xs">
                      Passwords do not match
                    </span>
                  </div>
                )}
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="password"
                  type="password"
                  value={parentData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-full flex flex-col mt-5">
                <div className="h-4 flex flex-row">
                  <span className="text-base font-bold text-dark-gray leading-4">
                    Confirm Password
                  </span>
                  <span className="text-base font-bold text-light-red leading-4">
                    &nbsp;*
                  </span>
                </div>
                <input
                  className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 mt-3"
                  name="passwordConfirm"
                  type="password"
                  value={parentData.passwordConfirm}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* form control */}
              <div className="w-full h-10 mt-12 flex flex-row justify-between gap-3">
                <button
                  className="h-10 w-60 bg-secondary-default rounded-lg flex justify-center items-center border-[1px] border-primary-default"
                  onClick={handleCancel}
                  type="button"
                >
                  <span className="text-base leading-4 text-primary-default font-bold">
                    Cancel
                  </span>
                </button>
                <button
                  className="h-10 w-60 bg-primary-default rounded-lg flex justify-center items-center"
                  type="submit"
                  // onClick={handleSubmit}
                >
                  <span className="text-base leading-4 text-secondary-default font-bold">
                    Add parent
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddParentModal;
