import React, { useEffect, useState } from "react";
import axios from "axios";
import GenderCategory from "./GenderCategory";
import { API_URL } from "../../config";

export const GenderCategories = () => {

  const [gendercategories, setGenderCategories] = useState([]);
  const [isLoading, setIsLoading] =useState(false);
  useEffect(() => {
    const getGenderCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/categories/`);
        setGenderCategories(res.data);
      } catch (err) {console.log(err);}
      setIsLoading(false);

    };
    getGenderCategories();

  }, []);
  return (
    <div className="mx-0">
       {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* <h2 className="text-3xl font-open-sans font-normal py-3">Categories</h2> */}
      <div className="grid grid-rows-2 md:grid-rows-2 gap-4 box-border">
        {gendercategories.map((cat) => (
          <GenderCategory key={cat?._id} gendercategory={cat} />
        ))}
      </div>
    </div>
  );
};
