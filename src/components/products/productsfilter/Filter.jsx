import { useEffect, useRef, useState } from "react";

const Filter = ({ filterName, options, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const lowercaseFilterName = filterName.toLowerCase();

  const toggleFilters = (value) => {
    setFilters((prev) =>
      prev[lowercaseFilterName] && prev[lowercaseFilterName].includes(value)
        ? {
            ...prev,
            [lowercaseFilterName]: prev[lowercaseFilterName].filter(
              (s) => s !== value
            ),
          }
        : {
            ...prev,
            [lowercaseFilterName]: [
              ...(prev[lowercaseFilterName] || []),
              value,
            ],
          }
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex justify-between gap-2 items-center w-full py-4 px-2 text-xs font-bold bg-transparent focus:outline-none cursor-pointer ${
          isOpen ? "border border-b-0" : ""
        }`}
      >
        {filterName}
        <svg
          className="w-[10px] h-[4px] text-gray-700"
          viewBox="0 0 10 4"
          fill="none"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
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
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 bg-white border border-gray-200 shadow-lg">
          <ul className="py-1 max-h-72 overflow-auto">
            {options.map(({ label, count }) => (
              <li
                key={label}
                className="flex items-center mx-4 py-4 border-b border-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={Boolean(
                    filters[lowercaseFilterName]?.includes(label)
                  )}
                  onChange={() => toggleFilters(label)}
                  className="mr-2 cursor-pointer"
                />
                <span className="flex-1 text-sm font-normal text-gray-900">
                  {label}
                </span>
                <span className="text-xs font-normal text-gray-400">
                  ({count})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
