import { useLocation } from "react-router-dom";
import ProductItem from "../components/productitem/ProductItem";
import { useGetAProductQuery } from "../features/productSlice";

const ProductItemPage = () => {
  const location= useLocation();
  const id = location.state?.productId;
  const {data: product, isLoading, isError} = useGetAProductQuery(id);

  return (
    <div>
      <div className="flex flex-wrap gap-2 box-border">
        <ProductItem key={product?._id} item={product} />
      </div>
    </div>
  );
};

export default ProductItemPage;
