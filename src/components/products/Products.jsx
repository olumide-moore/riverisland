import { useEffect, useState } from "react";
import Product from "../products/Product";

const Products = ({ products, filters, selectedSort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterProducts = () => {
    setFilteredProducts(
      products.filter((prod) =>
        Object.entries(filters).every(([key, values]) => {
          if (!values.length) return true;
          if (key == "price") {
            return prod[key] >= values[0] && prod[key] <= values[1];
          }
          return values.includes(prod[key]);
        })
      )
    );
  };

  const sortProducts = () => {
    if (selectedSort === "Latest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (selectedSort === "Price - low to high") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (selectedSort === "Price - high to low") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  };

  useEffect(() => {
    filterProducts();
  }, [products, filters]);

  useEffect(() => {
    sortProducts();
  }, [selectedSort]);

  return (
    <div className="mb-20">
      <div className="font-bold text-xs text-gray-600 mx-3 py-4 uppercase">
        {filteredProducts.length} PRODUCTS
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 box-border">
        {filteredProducts.map((item) => (
          <Product key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
