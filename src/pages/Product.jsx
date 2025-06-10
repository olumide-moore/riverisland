import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context";
import Card from "../components/Card";

const Product = () => {
  const { id } = useParams();
  const { getProduct } = useContext(GlobalContext);
  const item = getProduct(id);
  return (
    <div>
      <div className="flex flex-wrap gap-2 box-border">
          <Card key={item?.id} item={item} />
      </div>
    </div>
  );
};

export default Product;
