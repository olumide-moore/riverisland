import { Link } from "react-router-dom";

const GenderCategory = ({gendercategory}) => {
   return (
    <Link
      to={`/${gendercategory?._id}`}
      className="relative"
    >
      <div>
         <img 
              src={gendercategory?.image}
              alt={gendercategory?.name}
              // width="200"
              // height="200"
        // className="w-[400px] h-[400px] object-cover"
            />
        {/* <h2 className="text-4xl font-medium underline mt-2 tracking-wide absolute bottom-1/2 left-1/4 text-white">{gendercategory?.name}</h2> */}
        {/* <h2 className="text-4xl font-medium mt-2 tracking-wide absolute bottom-2 left-1/4 p-2 rounded-sm text-white bg-gray-900">{gendercategory?.name}</h2> */}
        {/* <h2 className={`text-4xl font-medium mt-2 tracking-wide absolute bottom-20 left-1/3 p-2 rounded-sm underline ${gendercategory?.name=="Women" ? 'text-gray-900' : 'text-white'}`}>{gendercategory?.name}</h2> */}
        <h2 className={`text-[18px] sm:text-[28px] leading-none absolute w-auto top-[76%] left-1/2 transform -translate-x-1/2  font-medium underline font-sans ${gendercategory?.name=="Women" ? 'text-gray-900' : 'text-white'}`}>{gendercategory?.name}</h2>
      </div>
    </Link>
  );
}

export default GenderCategory
