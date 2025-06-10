import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import { useState } from "react";
import Product from "./pages/Product";
import ProductsList from "./pages/ProductsList";
import { GetEmail } from "./pages/Auth/GetEmail";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";

export default function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <DefaultLayout setSearchText={setSearchText}>
        <Routes>
          <Route  index path="/" element={<Home searchText={searchText} />} />
          <Route path="/productslist/:id" element={<ProductsList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/getemail" element={<GetEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </DefaultLayout>
  );
}
