import axios from "axios";
import { useEffect, useState } from "react";
import { BsHeartbreakFill } from "react-icons/bs";
import WishItem from "../components/wishlist/WishItem";

const WishListPage = () => {
  const [localWishlist, setLocalWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let productIds = localWishlist; //firstly fetch wishlist from local storage
      // If logged in, use wishlist from server
      if (user && token) {
        const res = await axios.get(
          `http://localhost:3000/api/wishlists/find/${user._id}`,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        productIds = res.data.productIds || [];
      }

      if (productIds.length > 0) {
        //Get the products of the productIds
        const res = await axios.post(
          "http://localhost:3000/api/products/find-many",
          { ids: productIds }
        );
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      if (user && token) {

        // Update server-side wishlist
        await axios.put(
          `http://localhost:3000/api/wishlists/remove/${user._id}`,
          {
            productId: itemId,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Guest: Update localStorage
        const updated = localWishlist.filter((id) => id !== itemId);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setWishlist(updated);
      }

      // Refresh
      getProducts();
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [localWishlist]);

  return (
    <div className="mx-5 mt-8">
      <div className="bg-gray-100 inline-flex py-1 px-2 rounded-xl justify text-gray-500 text-xs font-medium ">
        <span className="font-bold">{products.length}&nbsp; </span>Items
      </div>
      <h2 className="text-3xl font-open-sans font-medium">Wishlist</h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 box-border mt-10">
          {products.map((product) => (
            <WishItem
              key={product?._id}
              item={product}
              deleteItem={deleteItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 max-w-5xl mx-auto mt-6">
          <div className="bg-[#fbfbfb] px-6 pt-10 pb-6 w-full">
            <p className="text-[15px] font-normal text-gray-600">
              Your wishlist is only temporary right now.
              <span className="font-bold text-gray-700"> Sign in</span> or{" "}
              <span className="font-bold text-gray-700">create an account</span>{" "}
              to access your favourite items whenever you want.
            </p>
            <div className="mt-4 flex justify-center space-x-3">
              <button className="bg-yellow-300 text-black text-sm font-normal w-1/2 sm:w-40 p-3 rounded">
                Sign in
              </button>
              <button className="border border-gray-300 text-gray-900 bg-white text-sm font-normal  w-1/2 sm:w-40 p-3 rounded">
                Create an account
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 mt-10 border p-4 border-dashed rounded-md">
            <BsHeartbreakFill size={30} className="text-gray-500" />
            <h4 className="text-sm font-bold">Your wishlist is empty!</h4>
            <p className="text-[13px] font-normal text-gray-500">
              That's alright, just tap the heart on your favourite items and
              they'll appear here for later
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
