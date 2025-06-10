import { CiHeart } from "react-icons/ci";
import { PiHeartStraight } from "react-icons/pi";
import { VscHeart } from "react-icons/vsc";
import { Link } from "react-router-dom";

const CategoryCard = ({ item, searchText }) => {
  function showCard() {
    // return item?.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    return "block"; // For testing purposes, always show the card
  }
  // const imageSrc = import(`../assets/product_images/${item.image}`).default;
  return (
    <div className={`relative flex flex-col  ${
      showCard() ? "block" : "hidden"
    }`}>

      <button className="absolute top-2 right-2 bg-white p-2.5 rounded-md">
        <VscHeart className="text-gray-600" 
        size={18}/>
      </button>
      <img
        src={item?.image}
        alt={item?.name}
        width="500"
        height="500"
      />
      <h1 className="text-sm font-normal mt-2 tracking-wide">{item?.name}</h1>
      <h2 className="text-xs font-normal my-5 tracking-wide">£{item?.price}</h2>
    </div>
  );
};

export default CategoryCard;
