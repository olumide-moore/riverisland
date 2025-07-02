import { useEffect, useState } from "react";
import { PiHeartStraightFill, PiHeartStraightThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = ({ item }) => {
  // fallback for guests
  const [isLiked, setIsLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  const toggleWishlist = async () => {

    const itemId = item?._id;
    if (!itemId) return;
    if (user && token) {
      // Logged-in user - update server-side wishlist
      try {
        const headers = {
          token: `Bearer ${token}`,
        };

        const res = await axios.get(
          `http://localhost:3000/api/wishlists/find/${user._id}`,
          { headers }
        );

        const serverWishlist = res.data?.productIds || [];
        const isInWishlist = serverWishlist.includes(itemId);

        if (isInWishlist) {
          // Remove item from wishlist
          await axios.put(
            `http://localhost:3000/api/wishlists/remove/${user._id}`,
            { productId: itemId },
            { headers }
          );
          setIsLiked(false);
        } else {
          // Add item to wishlist
          await axios.post(
            `http://localhost:3000/api/wishlists/add/${user._id}`,
            { productId: itemId },
            { headers }
          );
          setIsLiked(true);
        }
      } catch (err) {
        console.error("Error updating user wishlist:", err);
      }
    } else {
      // Guest user - update localStorage
      const localWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      const isInWishlist = localWishlist.includes(itemId);

      const updatedWishlist = isInWishlist
        ? localWishlist.filter((id) => id !== itemId)
        : [...localWishlist, itemId];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsLiked(!isInWishlist);
    }
  };

  function showProduct() {
    return "block"; // For testing purposes, always show the card
  }

  // Load liked status from localStorage

  useEffect(() => {
    const checkWishlistStatus = async () => {
      const itemId = item?._id;

      if (!itemId) return;

      if (user && token) {
        // Logged-in user: fetch wishlist from server
        try {
          const res = await axios.get(
            `http://localhost:3000/api/wishlists/find/${user._id}`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          const serverWishlist = res.data?.productIds || [];
          setIsLiked(serverWishlist.includes(itemId));
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          setIsLiked(false);
        }
      } else {
        // Guest: use localStorage
        const localWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setIsLiked(localWishlist.includes(itemId));
      }
    };

    checkWishlistStatus();
  }, [item]);

  return (
    <Link
      key={item?._id}
      to={`/product/${item?.name}`}
      state={{ productId: item?._id }}
      className={`relative flex flex-col  ${
        showProduct() ? "block" : "hidden"
      }`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist();
        }}
        className="absolute top-2 right-2 bg-white p-2.5 rounded-md"
      >
        {isLiked ? (
          <PiHeartStraightFill className="fill-gray-900" size={20} />
        ) : (
          <PiHeartStraightThin className="text-black stroke" size={20} />
        )}
      </button>
      {/* <img src={item?.image} alt={item?.name} width="500" height="500" /> */}
      <img src={item?.image} alt={item?.name} />
      <h1 className="text-sm font-medium mt-2 tracking-wide">{item?.name}</h1>
      <h2 className="text-xs font-medium my-7 tracking-wide">£{item?.price}</h2>
    </Link>
  );
};

export default Product;
