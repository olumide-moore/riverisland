import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";

const MIN = 0;
const MAX = 100;
const STEP = 1;

const Slider = ({ filterName, min = MIN, max = MAX, setFilters }) => {
  const [values, setValues] = useState([min, max]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleFilters = (value) => {
    setValues(value);
    const lowercaseFilterName = filterName.toLowerCase();
    setFilters((prev) => ({ ...prev, [lowercaseFilterName]: value }));
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
        <div className="absolute z-10 p-4 w-72 bg-white border border-gray-200 shadow-lg">
          <div className="flex justify-between mb-4">
            <div className="w-20 text-center border px-2 py-1 font-bold text-sm">
              £ {values[0]}
            </div>
            <div className="w-20 text-center border px-2 py-1 font-bold text-sm">
              £ {values[1]}
            </div>
          </div>

          <Range
            step={STEP}
            min={min}
            max={max}
            values={values}
            onChange={toggleFilters}
            renderTrack={({ props, children }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className="h-1 w-full bg-gray-300 rounded relative"
                >
                  <div
                    className="absolute h-1 bg-black rounded"
                    style={{
                      left: `${((values[0] - min) / (max - min)) * 100}%`,
                      width: `${
                        ((values[1] - values[0]) / (max - min)) * 100
                      }%`,
                    }}
                  />
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className="w-4 h-4 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                />
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
