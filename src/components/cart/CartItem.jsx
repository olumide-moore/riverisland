import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";

import { Link } from "react-router-dom";

const CartItem = ({ item, handleIncrease, handleDecrease, handleDelete }) => {

  return (
    <div className="flex items-start gap-4 border-b py-4">
      <img
        src={item?.image}
        alt={item?.name}
        className="w-20 h-20 object-cover"
      />

      <div className="flex-1">
        <h3 className="font-medium text-sm">{item?.name}</h3>
        <p className="text-sm font-semibold mt-1">£{item?.price}</p>
        <p className="text-xs underline text-gray-500 mt-2">M (UK)</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <button className="p-2 rounded-md bg-white border">
            <AiOutlineHeart size={16} />
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="p-2 rounded-md bg-white border"
          >
            <IoTrashOutline size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => handleDecrease(item.productId)}
            className="w-6 h-6 flex items-center justify-center font-semibold text-sm"
          >
            −
          </button>
          <span className="w-6 p-0.5 text-center text-xs font-normal bg-gray-50">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item.productId)}
            className="w-6 h-6 flex items-center justify-center font-semibold text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
