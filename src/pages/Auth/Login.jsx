import React from "react";

export function Login() {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">test@email.com</div>
        <input
          type="password"
          placeholder="Password"
          className="placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <button className="bg-black text-white font-normal text-sm py-4 rounded-md">Sign in</button>
        <p className="text-wrap text-base font-normal text-gray-900 underline decoration-1 underline-offset-8 mx-auto">Forgot password?</p>
      </div>
    </div>
  );
}
