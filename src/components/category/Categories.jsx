import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import { API_URL } from "../../config";

const Categories = ({gendercategoryid}) => {
const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories/${gendercategoryid}`);
        setCategories(res.data);
      } catch (err) {}
    };
    getCategories();
  }, [gendercategoryid]);

  return (
    
    <div className="mx-5">
        <h2 className="text-3xl font-open-sans font-normal py-3">
          {gendercategoryid.toUpperCase()}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 box-border">
          {categories.map((category) => (
            <Category key={category?._id} category={category} />
          ))}
        </div>
      </div>
  )
}
export default Categories;