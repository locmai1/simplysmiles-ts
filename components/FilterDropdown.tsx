import { useMemo, useState, useEffect } from "react";

// function Check(props: JSX.IntrinsicElements["svg"]) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 22 16"
//       width="16"
//       height="16"
//       fill="none"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       {...props}
//       className="mr-2"
//     >
//       <polyline points="20 6 9 17 4 12" />
//     </svg>
//   );
// }

type FilterDropdownProps = {
  items: string[];
  // selectedItem: string;
  initialItem: string;
  onItemSelect: (idx: number, item: string) => void;
};

export default function FilterDropdown({
  items,
  // selectedItem,
  initialItem,
  onItemSelect,
}: FilterDropdownProps) {
  const [filterText, setFilterText] = useState<string>("");
  const filteredItems = useMemo(
    () => items.filter((tag) => tag.indexOf(filterText) != -1),
    [filterText, items]
  );
  const [showOptions, setShowOptions] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    setFilterText(initialItem);
  }, [initialItem]);

  return (
    <div
      className="bg-red flex w-full flex-col mt-3 "
      onMouseLeave={() => setShowOptions(false)}
    >
      <input
        onChange={onChange}
        className="border-[1px] border-light-gray rounded-lg w-full h-10 px-4 focus:outline-none"
        onFocus={() => setShowOptions(true)}
        onClick={() => setShowOptions(true)}
        value={filterText}
        placeholder="Select home"
      />
      {showOptions && (
        <div className="relative w-full">
          <div className="top-100 absolute z-50 flex max-h-[150px] w-full flex-col overflow-y-auto bg-white">
            {/* <span
              className="flex flex-row px-4 items-center text-dark-gray hover:cursor-pointer hover:bg-blue-500 hover:text-white h-10 border-[1px] border-light-gray"
              onClick={() => {
                onItemSelect(0, "None");
                setFilterText("None");
                setShowOptions(false);
              }}
            >
              None
            </span> */}
            {filteredItems.map((item: string, index: number) => (
              <span
                className="flex flex-row px-4 items-center text-dark-gray hover:cursor-pointer hover:bg-blue-500 hover:text-white h-10 border-[1px] border-light-gray"
                onClick={() => {
                  onItemSelect(index + 1, item);
                  setFilterText(item);
                  setShowOptions(false);
                }}
                key={index}
              >
                {/* {selectedItem.includes(item) && <Check />} */}
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
