import { createContext, useState } from "react";
import { categories, items } from "../data/data";

function getAllCategories(){
  return categories;
}
function getProductsByCategoryId (categoryId){
    return items.filter(item => item.categoryId === categoryId);
}
function getProduct (id){
    return items.find(item => item.id === id);

}

export const GlobalContext = createContext(null);
const GlobalState = ({ children }) => {
  return (
    <GlobalContext.Provider value={{getAllCategories, getProductsByCategoryId, getProduct }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
