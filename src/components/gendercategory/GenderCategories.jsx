import React, { useEffect, useState } from "react";
import axios from "axios";
import GenderCategory from "./GenderCategory";
import { API_URL } from "../../config";

export const GenderCategories = () => {
  const [gendercategories, setGenderCategories] = useState([]);
  useEffect(() => {
    const getGenderCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories/`);
        setGenderCategories(res.data);
      } catch (err) {}
    };
    getGenderCategories();
  }, []);
  return (
    <div className="mx-5">
      {/* <h2 className="text-3xl font-open-sans font-normal py-3">Categories</h2> */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 box-border">
        {gendercategories.map((cat) => (
          <GenderCategory key={cat?._id} gendercategory={cat} />
        ))}
      </div>
    </div>
  );
};
