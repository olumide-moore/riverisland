import { CiHeart } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { VscHeart } from "react-icons/vsc";
import { useAddToCartMutation } from "../../features/cartSlice";
import { useLocalCart } from "../../contexts/CartContext";

const ProductItem = ({ item }) => {
  function showProductItem() {
    return "block"; // For testing purposes, always show the productitem
  }
  const [addToCart, { isLoading, isSuccess, error }] = useAddToCartMutation();
  const { addToLocalCart } = useLocalCart();

  async function handleAddToCart() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?._id) {
      try {
        await addToCart({
          userId: user._id,
          productId: item._id,
        }).unwrap();
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    } else {
      addToLocalCart(item._id);
    }
  }

  return (
    <div
      className={`relative flex flex-col  ${
        showProductItem() ? "block" : "hidden"
      }`}
    >
      <button className="absolute top-2 right-2 bg-white p-2.5 rounded-md">
        <VscHeart className="text-gray-600" size={18} />
      </button>
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
        <button className="bg-white p-3 rounded-md border">
          <VscHeart className="text-gray-900" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
