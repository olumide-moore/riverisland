import { useParams } from "react-router-dom";
import Categories from "../components/category/Categories";

const CategoriesPage = () => {
  const { gendercategoryid } = useParams();

  return (
    <>
    

      <Categories gendercategoryid={gendercategoryid} />
    </>
  );
};

export default CategoriesPage;
