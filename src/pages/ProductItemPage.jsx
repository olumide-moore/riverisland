import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductItem from "../components/productitem/ProductItem";

const ProductItemPage = () => {
  const location= useLocation();
  const id = location.state?.productId;
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/find/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2 box-border">
        <ProductItem key={product?._id} item={product} />
      </div>
    </div>
  );
};

export default ProductItemPage;
