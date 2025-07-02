import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { PiBagLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useGetUserCartQuery } from "../features/cartSlice";
import { useEffect, useState } from "react";
import { useLocalCart } from "../contexts/CartContext";

// import { useEffect } from "react";
const Header = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const { data: backendCart } = useGetUserCartQuery(userId, {
    skip: !userId,
  });

  const { localCart,localCartCount } = useLocalCart();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count;
    if (userId) {
      count = backendCart?.products?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    } else {
      count = localCartCount;
    }
    setCartCount(count);
  }, [backendCart, localCartCount, localCart]);

  return (
    <>
      <div className="bg-black flex justify-around py-3 text-white text-xs font-medium z-50">
        <p>£</p>
        <p>Free standard delivery | Find out more</p>
        <p>Gift great taste | Gift Cards</p>
        <p>Klarna available | Find out more</p>
      </div>
      <div className="sticky top-0 z-50 w-full">
        <div className="flex items-center justify-between border-b-[1px] border-neutral-300 shadow-sm shadow-neutral-100 bg-white gap-1 px-8 py-2">
          <div className="flex items-center gap-4">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="block p-1 dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5 w-4 top-0.5 cursor-pointer">
                <span className="absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-1 mb-1.5 block h-[1.1px] w-0 bg-black delay-[0] duration-200 ease-in-out dark:bg-black ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-1 mb-1 block h-[1.1px] w-0 bg-black delay-200 duration-200 ease-in-out dark:bg-black ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-black ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-black ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
            <a className="cursor-pointer" href="/">
              <h1 className="font-work-sans text-lg">RiverIsland</h1>{" "}
            </a>
          </div>
          <div className=" invisible xl:visible flex align-middle  gap-2.5 mr-64">
            <Link
              to={`/women`}
              className="text-sm font-medium cursor-pointer px-2.5"
            >
              Women
            </Link>
            <Link
              to={`/men`}
              className="text-sm font-medium cursor-pointer px-2.5"
            >
              Men
            </Link>
            {/* <h1 className="text-sm font-medium cursor-pointer px-2.5">Kids</h1>
            <h1 className="text-sm font-medium cursor-pointer px-2.5">
              Holiday Shop
            </h1>
            <h1 className="text-sm font-medium cursor-pointer px-2.5">Jeans</h1> */}
          </div>
          <div className="flex gap-3">
            {/* <div className="flex py-2 px-3 gap-1.5 border border-gray-200 rounded-[3px] cursor-pointer">
              <CiSearch className="text-neutral-700" size="14" />
              <p className="font-normal text-xs text-[#3D3935]">Search</p>
            </div> */}
            <Link
              className="flex py-2 px-3 gap-1.5 border border-gray-200 rounded-[3px] cursor-pointer"
              to={`/getemail`}
            >
              <CiUser className="text-[#3D3935]" size="15" />
              <p className="font-normal text-xs text-[#3D3935]">Account</p>
            </Link>
            <Link
              className="flex py-2 px-3 gap-1.5 border border-gray-200 rounded-[3px] cursor-pointer"
              to={`/wishlist`}
            >
              <CiHeart className="text-[#3D3935]" size="15" />
              <p className="font-normal text-xs text-[#3D3935]">Wishlist</p>
            </Link>
            <Link
              className="flex py-2 px-3 gap-1.5 rounded-[3px] cursor-pointer bg-yellow-300 bg-opacity-90"
              to={`/cart`}
            >
              <PiBagLight className="text-neutral-700" size="15" />
              <p className="font-normal text-xs text-[#3D3935]">Bag</p>
              <span className="text-xs font-semibold text-black">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
