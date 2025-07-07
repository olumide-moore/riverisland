import { useEffect, useState } from "react";
import { PiHeartStraightFill, PiHeartStraightThin } from "react-icons/pi";
import { useAddToCartMutation } from "../../features/cartSlice";
import { useLocalCart } from "../../contexts/CartContext";
import { useLocalWishlist } from "../../contexts/WishlistContext";
import {
  useGetUserWishlistQuery,
  useToggleWishlistMutation,
} from "../../features/wishlistSlice";

const ProductItem = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("accessToken");

  const { data: serverWishlist } = useGetUserWishlistQuery(userId, {
    skip: !userId,
  });

  const [addToCart, { isLoading, isSuccess, error }] = useAddToCartMutation();
  const { addToLocalCart } = useLocalCart();
  const [toggleWishlist] = useToggleWishlistMutation();
  const { localWishlist, toggleLocalWishlist } = useLocalWishlist();

  async function handleAddToCart() {
    if (userId) {
      try {
        await addToCart({
          userId: userId,
          productId: item._id,
        }).unwrap();
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    } else {
      addToLocalCart(item._id);
    }
  }

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
    <div className={`relative flex flex-col`}>
      <img src={item?.image} alt={item?.name} width="500" height="500" />
      <div className="flex justify-between items-center border-red-200 my-5 mx-3">
        <h1 className="text-lg font-bold tracking-wide">{item?.name}</h1>
        <h2 className="text-base font-bold tracking-wide">£{item?.price}</h2>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded-lg cursor-pointer bg-yellow-300 bg-opacity-90 font-bold text-sm"
        >
          Add to bag
        </button>
        <button
          className="bg-white p-3 rounded-md border"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLikeToggle();
          }}
        >
          {isLiked ? (
            <PiHeartStraightFill className="fill-gray-900" size={20} />
          ) : (
            <PiHeartStraightThin className="text-black stroke" size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
