import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalCart } from "../../contexts/CartContext";
import { useAddManyToCartMutation } from "../../features/cartSlice";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { localCart, setLocalCart } = useLocalCart();
  const [addManyToCart] = useAddManyToCartMutation();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/login`, {
        email,
        password,
      });

      // Save user and token to localStorage
      let user = res.data;
      const userId = user?._id;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", res.data.accessToken);

      // Check for guest wishlist in localStorage
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));
      if (wishlist && Array.isArray(wishlist) && wishlist.length > 0) {
        // Send items to backend to merge with user wishlist
        await axios.post(
          `http://localhost:3000/api/wishlists/add-many/${res.data._id}`,
          { productIds: wishlist },
          {
            headers: {
              token: `Bearer ${res.data.accessToken}`,
            },
          }
        );
        localStorage.removeItem("wishlist"); // Clear guest wishlist from localStorage
      }
      //Check for guest cart in localStorage
        console.log(localCart);
      if (localCart && Array.isArray(localCart) && localCart.length > 0) {
        addManyToCart({ userId, products:  localCart });
      }

      // Redirect to homepage
      setLocalCart([]);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid password or user does not exist");
    }
  };

  useEffect(() => {
    !email && navigate("/getemail");
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center gap-5 mt-20 w-80">
        <div className="text-xl font-normal">{email}</div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 h-12 p-2 border border-gray-300 rounded-sm focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white font-normal text-sm py-4 rounded-md"
        >
          Sign in
        </button>

        {error && <p className="text-sm text-red-600 font-normal">{error}</p>}

        <p className="text-wrap text-base font-normal text-gray-900 underline decoration-1 underline-offset-8 mx-auto">
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
