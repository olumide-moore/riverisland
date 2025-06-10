import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/index.jsx";
import banner from "/images/banner.webp";
import HomeCard from "../components/HomeCard.jsx";
const Home = ({ searchText }) => {
  const [categories, setCategories] = useState([]);
  const { getAllCategories } = useContext(GlobalContext);
  useEffect(() => {
    const data = getAllCategories();
    setCategories(data);
  }, []);
  return (
    // <div className="py-8 container mx-auto flex flex-col flex-wrap justify-center gap-10">
    <div className="py-0 flex flex-col flex-wrap justify-center gap-8">
      <div className="flex flex-col">
        <div className="pl-8 py-3 text-sm font-medium text-gray-500 cursor-pointer">
          Home <span>&nbsp;{" > "} &nbsp;</span> Men
        </div>
        <div className="mx-auto">
          {/* <img src={banner} width={4000}></img> */}
        </div>
      </div>
      <div className="mx-5">
        <h2 className="text-3xl font-open-sans font-normal py-3">Popular Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 box-border">
          {categories.map((category) => (
            <HomeCard key={category?.id} category={category} />
            
          ))}
        </div>
      </div>
      
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      <div>Home</div>
      HOme
    </div>
  );
};

export default Home;
