import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Products from "../components/products/Products";
import ProductsFiltersGroup from "../components/products/productsfilter/ProductsFiltersGroup";
import { useGetCategoryProductsQuery } from "../features/productSlice";

const ProductsPage = () => {
  const { categoryid } = useParams();
  const location = useLocation();
  const category = location.state.category;
  // const [products, setProducts] = useState([]);
  const [filters, setFilters]= useState({});
  const [selectedSort, setSelectedSort] = useState("Latest");

  const { data: products, isLoading } = useGetCategoryProductsQuery(categoryid);

  return (
    <div className="mx-10">
      <div className="flex items-center gap-2 py-3 text-sm font-normal text-gray-700 cursor-pointer">
        <div>Home</div>
        <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 6 10"> <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div>
          {category?.parentName.charAt(0).toUpperCase() +category?.parentName.slice(1)}
        </div>
        <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 6 10"><path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /> </svg>
        <div>{category?.name}</div>
        {/* <div className="mx-auto">
          <img src={banner} width={4000}></img>
          </div> */}
      </div>
      <ProductsFiltersGroup filters={filters} setFilters={setFilters} sizeType={category?.sizeType} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
      {products &&
      
      <Products products={products} filters={filters} selectedSort={selectedSort}/>
      }
    </div>
  );
};
export default ProductsPage;


