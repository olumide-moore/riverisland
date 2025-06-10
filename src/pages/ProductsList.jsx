import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context";
import CategoryCard from "../components/CategoryCard";

const ProductsList = () => {
  const { id } = useParams();
  const { getProductsByCategoryId } = useContext(GlobalContext);
  const items = getProductsByCategoryId(id);
  return (
    <div className="mx-5">
      <h2 className="text-lg font-bold py-3">Popular Categories</h2>
      <Filter />
      <div className="grid grid-cols-4 gap-4 box-border">
        {items.map((item) => (
          <Link key={item?.id} to={`/product/${item?.id}`} className={``}>
            <CategoryCard key={item?.id} item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const Filter = () => {
  return (
    <div className="flex flex-nowrap items-center justify-between gap-4 my-3">
      <div className="flex flex-wrap items-center gap-4">
        <select className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer">
          <option>Category</option>
        </select>
        <select className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer">
          <option>Colour</option>
        </select>
       
        <select className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer">
          <option>Size</option>
        </select>
      
        <select className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer">
          <option>Price</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs">Sort:</span>
        <select className="text-xs font-semibold bg-transparent focus:outline-none cursor-pointer">
          <option>Featured</option>
        </select>
      </div>
    </div>
  );
};
export default ProductsList;
