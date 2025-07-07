import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // If using React Router
import { API_URL } from "../../config";

const GetEmailPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email format
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/verify-email`,
        { email }
      );
      if (res.data.exists) {
        navigate("/login", { state: { email } }); // Navigate to login page, passing email as state or param
      } else {
        navigate("/signup", { state: { email } }); // Navigate to signup page, passing email as state or param
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">What's your email?</div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />
        <button
          onClick={handleContinue}
          className="bg-black text-white font-normal text-sm py-4 rounded-md"
        >
          Continue
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <p className="text-wrap text-sm font-normal text-gray-500">
          If you don't have an account with us yet, you will be asked to create
          one
        </p>
      </div>
    </div>
  );
};

export default GetEmailPage;
