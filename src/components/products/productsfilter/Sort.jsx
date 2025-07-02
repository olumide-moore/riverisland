import { useEffect, useRef, useState } from "react";

const Sort = ({ options, selectedSort, setSelectedSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelect = (value) => {
    setSelectedSort(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block text-left ">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between gap-3 w-full py-4 px-6 text-xs bg-transparent focus:outline-none cursor-pointer ${
          isOpen ? "border border-b-0" : ""
        }`}
      >
        <span className="font-normal">Sort:</span>

        <div className="inline-flex justify-between gap-2 items-center ">
          <span className="font-bold">{selectedSort}</span>
          <svg
            className="w-[10px] h-[4px] text-gray-700"
            viewBox="0 0 10 4"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g transform="translate(-1311, -309)">
                <polyline
                  transform={`translate(1316, 311) rotate(${
                    isOpen ? 270 : 90
                  }) translate(-1316, -311)`}
                  points="1314 307 1318 311 1314 315"
                />
              </g>
            </g>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full px-6 bg-white border border-gray-200 border-t-0 shadow-lg">
          <ul className="py-3 max-h-72 overflow-auto">
            {options.map((option) => (
              <li
                key={option}
                className={`flex items-center text-sm py-2 cursor-pointer ${
                  selectedSort === option
                    ? "font-normal text-black"
                    : "font-normal text-gray-500"
                }`}
                onClick={() => onSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
