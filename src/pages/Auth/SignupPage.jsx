import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

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

  // State hooks for form inputs
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    if (
      !title ||
      !firstName ||
      !lastName ||
      !password ||
      !day ||
      !month ||
      !year
    ) {
      setError("Please fill in all fields");
      return;
    }

    const dob = new Date(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`
    );
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        title,
        firstName,
        lastName,
        dob,
        password,
      });

      // You can redirect after success
      navigate("/login", { state: { email } });
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };
 useEffect(() => {
    !email && navigate("/getemail");
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">Create an account</div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          type="email"
          disabled
          value={email}
          className="text-sm font-normal text-gray-500 h-12 p-2 border border-gray-300 rounded-sm"
        />
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm font-normal text-gray-500 w-1/2 h-12 p-2 border border-gray-300 rounded-sm"
        >
          <option value="">Title</option>
          {titles.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="text-sm h-12 p-2 border border-gray-300 rounded-sm"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="text-sm h-12 p-2 border border-gray-300 rounded-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-sm h-12 p-2 border border-gray-300 rounded-sm"
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-normal text-black">
            Date of birth
          </label>
          <div className="flex h-10">
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-l-sm"
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
              onChange={(e) => setMonth(e.target.value)}
              className="w-24 px-2 py-1 text-sm border border-gray-300 border-l-0 border-r-0"
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
              onChange={(e) => setYear(e.target.value)}
              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-r-sm"
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
          className="bg-black text-white font-normal text-sm py-4 rounded-md"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
