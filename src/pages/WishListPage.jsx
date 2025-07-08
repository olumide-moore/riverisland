import { useEffect } from "react";
import { BsHeartbreakFill } from "react-icons/bs";
import WishItem from "../components/wishlist/WishItem";
import {
  useGetUserWishlistQuery,
  useToggleWishlistMutation,
} from "../features/wishlistSlice";
import { useLocalWishlist } from "../contexts/WishlistContext";
import { useGetProductsMutation } from "../features/productSlice";
import { Link } from "react-router-dom";

const WishListPage = () => {
  const user = JSON.parse(localStorage.getItem("user")); // get user data and token
  const userId = user?._id;
  const token = localStorage.getItem("accessToken");

  const { localWishlist, toggleLocalWishlist } = useLocalWishlist(); // check for local wishlist

  const { data: serverWishlist, isLoading: wishlistLoading } =
    useGetUserWishlistQuery(userId, { skip: !userId }); // fetch wishlist from server if user logged in
  const productIds =
    user && token ? serverWishlist?.productIds || [] : localWishlist; // get the wishlist products ids

  const [getProducts, { data: products = [], isLoading: productsLoading }] =
    useGetProductsMutation(); //get the products of the product ids
  const [toggleWishlist] = useToggleWishlistMutation();

  const deleteItem = async (itemId) => {
    try {
      if (user && token) {
        await toggleWishlist({
          userId: user?._id,
          productId: itemId,
        }).unwrap();
      } else {
        toggleLocalWishlist(itemId); // Guest: Update localStorage
      }
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
    }
  };
  useEffect(() => {
    if (productIds?.length) {
      getProducts(productIds);
    }
  }, [productIds]);

  if (wishlistLoading || productsLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
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
              <Link
              to={`/login`}
               className="bg-yellow-300 text-black text-sm font-normal w-1/2 sm:w-40 p-3 rounded">
                Sign in
              </Link>
              <Link 
              to={`/signup`}
              className="border border-gray-300 text-gray-900 bg-white text-sm font-normal  w-1/2 sm:w-40 p-3 rounded">
                Create an account
              </Link>
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
