import React from "react";

export function Signup() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 16 - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">Create an account</div>
        <input
          type="email"
          placeholder="Email address"
          disabled
          value="test@email.com"
          className="text-sm font-normal text-gray-500 placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <input
          type="text"
          placeholder="First name"
          className="text-sm font-normal text-black placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <input
          type="text"
          placeholder="Last name"
          className="text-sm font-normal text-black placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="text-sm font-normal text-black placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-normal text-black">
            Date of birth
          </label>
          <div className="flex h-10">
            {/* Day */}
            <select className="w-24 px-2 py-1 text-sm font-normal border border-gray-300 rounded-l-sm focus:outline-none focus:ring-1 focus:ring-black">
              <option>Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {/* Month */}
            <select className="w-24 px-2 py-1 text-sm font-normal border border-gray-300 border-r-0 border-l-0 focus:outline-none focus:ring-1 focus:ring-black">
              <option>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>

            {/* Year */}
            <select className="w-24 px-2 py-1 text-sm font-normal border border-gray-300 rounded-r-sm focus:outline-none focus:ring-1 focus:ring-black">
              <option>Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="bg-black text-white font-normal text-sm py-4 rounded-md">
          Sign up
        </button>
      </div>
    </div>
  );
}
