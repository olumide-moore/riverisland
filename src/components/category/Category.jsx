import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <Link
      to={`/products/${category?._id}`}
      state={{ category: category }}
    >
      <div>
         <img 
              src={category?.image}
              alt={category?.name}
              // width="200"
              // height="200"
            />
        <h2 className="text-base font-normal mt-2 tracking-wide">{category?.name}</h2>
      </div>
    </Link>
  );
};

export default Category;
