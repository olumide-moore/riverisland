import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const WishItem = ({ item, deleteItem}) => {
 
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
          deleteItem(item?._id);
        }}
        className="absolute top-2 right-2 bg-white p-2.5 rounded-md"
      >
          <IoTrashOutline className="text-black stroke" size={20} />
      </button>
      {/* <img src={item?.image} alt={item?.name} width="500" height="500" /> */}
      <img src={item?.image} alt={item?.name} />
      <h1 className="text-sm font-medium mt-2 tracking-wide">{item?.name}</h1>
      <h2 className="text-xs font-medium my-7 tracking-wide">£{item?.price}</h2>
    </Link>
  );
};

export default WishItem;
