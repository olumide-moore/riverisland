import { useEffect, useState } from "react";
import { PiHeartStraightFill, PiHeartStraightThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useGetUserWishlistQuery,
  useToggleWishlistMutation,
} from "../../features/wishlistSlice";
import { useLocalWishlist } from "../../contexts/WishlistContext";

const Product = ({ item }) => {
  // fallback for guests
  const [isLiked, setIsLiked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("accessToken");

  const { data: serverWishlist, isLoading } = useGetUserWishlistQuery(userId, {
    skip: !userId,
  });
  const [toggleWishlist] = useToggleWishlistMutation();
  const { localWishlist, toggleLocalWishlist } = useLocalWishlist();

  const handleLikeToggle = async () => {
    const itemId = item?._id;
    if (!itemId) return;
    if (user && token) {
      try {
        const res = await toggleWishlist({
          userId: userId,
          productId: itemId,
        }).unwrap(); // Logged-in user - update server-side wishlist
        setIsLiked(res.liked);
      } catch (err) {
        console.error("Error updating user wishlist:", err);
      }
    } else {
      // Guest user - update localStorage
      const liked = toggleLocalWishlist(itemId);
      setIsLiked(liked);
    }
  };

  // Load liked status from localStorage
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const itemId = item?._id;

      if (!itemId) return;

      if (user && token) {
        // Logged-in user: fetch wishlist from server
        try {
          const productIds = serverWishlist?.productIds || [];
          setIsLiked(productIds.includes(itemId));
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          setIsLiked(false);
        }
      } else {
        // Guest: use localStorage
        setIsLiked(localWishlist.includes(itemId));
      }
    };

    checkWishlistStatus();
  }, [serverWishlist, item]);

  return (
    <Link
      key={item?._id}
      to={`/product/${item?.name}`}
      state={{ productId: item?._id }}
      className={`relative flex flex-col`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleLikeToggle();
        }}
        className="absolute top-2 right-2 bg-white p-2 rounded-md"
      >
        {isLiked ? (
          <PiHeartStraightFill className="fill-gray-900" size={18} />
        ) : (
          <PiHeartStraightThin className="text-black stroke" size={16} />
        )}
      </button>
      {/* <img src={item?.image} alt={item?.name} width="500" height="500" /> */}
      <img src={item?.image} alt={item?.name} />
      <h1 className="text-sm font-medium mt-2 mx-3 tracking-wide">{item?.name}</h1>
      <h2 className="text-xs font-medium my-3 mx-3 tracking-wide">£{item?.price}</h2>
    </Link>
  );
};

export default Product;
