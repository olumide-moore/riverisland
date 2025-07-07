import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const MyDetails = ({
  title,
  firstName,
  lastName,
  day,
  month,
  year,
  setTitle,
  setFirstName,
  setLastName,
  setDay,
  setMonth,
  setYear,
}) => {
  const titles = ["Miss.", "Mr.", "Mrs.", "Ms.", "Mx."];
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

  // // State hooks for form inputs

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateDetails = async () => {
    if (!title || !firstName || !lastName || !day || !month || !year) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    const userId = user?._id;
    const token = localStorage.getItem("accessToken");
    const dob = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (user && token) {
      try {
        const res = await axios.post(
          `${API_URL}/api/users/${userId}`,
          {
            title,
            firstName,
            lastName,
            dob,
          },
          {
            headers: { token: `Bearer ${token}` },
          }
        );
        const data = res.data;
        localStorage.setItem("user", JSON.stringify(data));
        setError("");
        setIsLoading(false);
        setSuccessMessage("Details updated");
        setTimeout(() => setSuccessMessage(""), 2000);
      } catch (err) {
        console.log(err);
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
        <h2 className="text-xl font-medium mb-8">MY DETAILS</h2>
        <div className="bg-[#f7f3ed] p-12 text-center flex flex-col gap-0 md:px-28">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-start gap-5 w-full">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex flex-col text-left text-sm w-1/2 gap-1">
                <label>Title</label>
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm"
                >
                  <option value="">Title</option>
                  {titles.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col text-left text-sm w-full gap-1">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
                />
              </div>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-sm h-12 p-2 border border-gray-400 rounded-sm w-full"
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-normal text-black text-left">
                  Date of birth
                </label>
                <div className="flex h-14">
                  <select
                    value={day}
                    onChange={(e) => {
                      const value = e.target.value;
                       setDay( value ? parseInt(value) : '');
                    }}
                    className="min-w-28 pl-5 py-1 text-sm border border-gray-400 rounded-l-sm"
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    value={month}
                    onChange={(e) => {
                      const value = e.target.value;
                       setMonth( value ? parseInt(value) : '');
                    }}
                    className="min-w-28 pl-5 py-1 text-sm border border-gray-400 border-l-0 border-r-0"
                  >
                    <option value="">Month</option>
                    {months.map((m, i) => (
                      <option key={i + 1} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={year}
                    onChange={(e) => {
                      const value = e.target.value;
                       setYear( value ? parseInt(value) : '');
                    }}
                    className="min-w-28 pl-5 py-1 text-sm border border-gray-400 rounded-r-sm"
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="bg-black text-white font-bold text-sm py-4 w-full md:w-80 mt-12 "
                onClick={handleUpdateDetails}
              >
                Update details
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default MyDetails;
