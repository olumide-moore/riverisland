import { CiHeart } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { VscHeart } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Card = ({ item, searchText }) => {
  function showCard() {
    // return item?.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    return "block"; // For testing purposes, always show the card
  }
  // const imageSrc = import(`../assets/product_images/${item.image}`).default;
  return (
    <div
      className={`relative flex flex-col  ${showCard() ? "block" : "hidden"}`}
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
        <button className="flex-1 rounded-lg cursor-pointer bg-yellow-300 bg-opacity-90 font-bold text-sm">
          Add to bag
        </button>
        <button className="bg-white p-3 rounded-md border">
          <VscHeart className="text-gray-900" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Card;
