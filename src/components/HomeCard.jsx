import { Link } from "react-router-dom";

const HomeCard = ({ category }) => {
  return (
    <Link
      to={`/productslist/${category?.id}`}
      className={``}
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

export default HomeCard;
