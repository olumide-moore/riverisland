import React from "react";

export function GetEmail() {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">What's your email?</div>
        <input
          type="email"
          placeholder="Email address"
          className="placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <button className="bg-black text-white font-normal text-sm py-4 rounded-md">Continue</button>
        <p className="text-wrap text-sm font-normal text-gray-500">If you don't have an account with us yet, you will be asked to create one</p>
      </div>
    </div>
  );
}
