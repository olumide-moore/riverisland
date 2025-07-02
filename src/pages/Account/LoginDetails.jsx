import { useState } from "react";

const LoginDetails = () => {
  let email = "";

  // State hooks for form inputs
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = async () => {};

  return (
    <main className="flex-1 px-6 md:mt-28 max-w-[1000px]">
      {/* Recent purchases */}
      <section>
        <h2 className="text-xl font-medium mb-8">LOGIN DETAILS</h2>
        <div className="bg-[#f7f3ed] p-12 text-center flex flex-col gap-0 md:px-28">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-start gap-5 w-full">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>Email</label>
                <input
                  type="email"
                  disabled
                  placeholder={email}
                  value={email}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>Current password</label>
                <input
                  type="password"
                  // value={firstName}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>New password</label>
                <input
                  type="password"
                  // value={firstName}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>Re-type password</label>
                <input
                  type="password"
                  // value={firstName}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
            

              <button
                className="bg-black text-white font-bold text-sm py-4 w-full md:w-80 mt-12 "
                onClick={handleUpdatePassword}
              >
                Update password
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default LoginDetails;
