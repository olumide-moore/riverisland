import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ProductItemPage from "./pages/ProductItemPage";
import GetEmailPage from "./pages/Auth/GetEmailPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import WishListPage from "./pages/WishListPage";
import AccountOverview from "./pages/Account/AccountOverview";
import RequireNoAuth from "./components/account/RequireNoAuth";
import Account from "./pages/Account/Account";
import { Provider } from "react-redux";
import { store } from "./store";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Routes>
          <Route
            index
            path="/"
            element={<HomePage />}
          />
          <Route path="/:gendercategoryid" element={<CategoriesPage />} />
          <Route path="/products/:categoryid" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductItemPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route
            path="/getemail"
            element={
              <RequireNoAuth>
                <GetEmailPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <RequireNoAuth>
                <SignupPage />
              </RequireNoAuth>
            }
          />
          <Route path="/myaccount" element={<Account />} />
        </Routes>
      </DefaultLayout>
    </Provider>
  );
}
