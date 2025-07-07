import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const LoginDetails = ({ email }) => {
  // State hooks for form inputs

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords does not match");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const userId = user?._id;
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      try {
        const res = await axios.post(
          `${API_URL}/api/users/change-password/${userId}`,
          {
            currentPassword,
            newPassword,
            confirmNewPassword,
          },
          {
            headers: { token: `Bearer ${token}` },
          }
        );

        setError("");
        setIsLoading(false);
        setSuccessMessage("Details updated");
        setTimeout(() => setSuccessMessage(""), 2000);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError("An unexpected error occurred.");
        }
        setIsLoading(false);
      }
    } else {
      setError(`You are not logged in`);
    }
  };

  return (
    <main className="flex-1 px-6 md:mt-28 max-w-[1000px]">
      {successMessage && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
          <h1 className="text-lg font-semibold text-black">Details updated</h1>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* Recent purchases */}
      <section>
        <h2 className="text-xl font-medium">LOGIN DETAILS</h2>
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
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>New password</label>
                <input
                  type="password"
                  // value={firstName}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>Re-type password</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
