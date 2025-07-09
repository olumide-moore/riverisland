import { useState, useEffect } from "react";
import { PiBagLight } from "react-icons/pi";
import { FiHeart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetUserCartQuery } from "../features/cartSlice";
import { useLocalCart } from "../contexts/CartContext";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const { data: serverCart } = useGetUserCartQuery(userId, { skip: !userId });
  const { localCart, localCartCount } = useLocalCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count;
    if (userId) {
      count = serverCart?.products?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    } else {
      count = localCartCount;
    }
    setCartCount(count);
  }, [serverCart, localCartCount, localCart]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black flex justify-around py-3 text-white text-xs font-medium">
        <p>£</p>
        <p>Free standard delivery | Find out more</p>
        <p>Gift great taste | Gift Cards</p>
        <p>Klarna available | Find out more</p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 h-14 w-full bg-white shadow-md border-b border-neutral-300">
        <div className="flex items-center justify-between px-6 h-full">
        <div className="flex">
          {/* Logo with Hamburger */}
          <div className="flex items-center gap-4 mr-20">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden focus:outline-none z-50 ${
                sidebarOpen && "hidden"
              }`}
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-6 bg-black"></span>
                <span className="block h-0.5 w-6 bg-black"></span>
                <span className="block h-0.5 w-6 bg-black"></span>
              </div>
            </button>
            <Link to="/" className="text-xl font-semibold">
              RiverIsland
            </Link>
          </div>

          <nav className="hidden lg:flex gap-6 group">
            <div className="flex justify-center items-center gap-6 text-sm font-normal">
              <Link
                to="/women"
                className="text-black py-[17px] px-2.5 peer hover:text-black hover:border-b hover:border-black"
              >
                Women
              </Link>
              <Link
                to="/men"
                className="text-black py-[17px] px-2.5 peer hover:text-black hover:border-b hover:border-black"
              >
                Men
              </Link>
              {/* <Link
                to="/kids"
                className="text-black py-[17px] px-2.5 peer hover:text-black hover:border-b hover:border-black"
              >
                Kids
              </Link> */}
            </div>
          </nav>
          </div>

          <div className="flex lg:gap-3">
            {/* <div className="flex py-1.5 px-2.5 gap-1.5 lg:border-gray-200 rounded-[4px] cursor-pointer">
              <CiSearch className="text-neutral-700" size="14" />
              <p className="font-normal text-xs text-[#3D3935] hidden lg:block">Search</p>
            </div> */}
            <Link
              className="flex items-center py-1.5 px-2.5 gap-1.5 lg:border border-gray-200 rounded-[4px] cursor-pointer"
              to={`/getemail`}
            >
              <FiUser className="text-[#3D3935]" size="17" />
              <p className="font-normal text-xs text-[#3D3935] hidden lg:block">
                Account
              </p>
            </Link>
            <Link
              className="flex items-center py-1.5 px-2.5 gap-1.5 lg:border border-gray-200 rounded-[4px] cursor-pointer"
              to={`/wishlist`}
            >
              <FiHeart className="text-[#3d3935]" size="17" />
              <p className="font-normal text-xs text-[#3D3935] hidden lg:block">
                Wishlist
              </p>
            </Link>
            <Link
              className=" relative flex items-center py-1.5 px-2.5 gap-1.5 rounded-[4px] cursor-pointer bg-yellow-300 bg-opacity-90"
              to="/cart"
            >
              <div className="relative w-5 h-6">
                <PiBagLight className="text-neutral-700" size="19" />

                <span
                  className={`absolute top-2.5 -right-2 bg-[#3d3935] text-white text-[11px] font-semibold rounded-full py-[1px] px-1.5 ${
                    cartCount > 0 ? "block lg:hidden" : "hidden"
                  }`}
                >
                  {cartCount}
                </span>
              </div>

              <p className="font-normal text-xs text-[#3D3935] hidden lg:block">
                Bag
              </p>
              <span
                className={`absolute -bottom-1.5 -right-2 bg-[#3d3935] text-white text-[11px] font-semibold rounded-full py-[1px] px-1.5 ${
                  cartCount > 0 ? "hidden lg:block" : "hidden"
                }`}
              >
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 w-1/2 h-screen bg-[#f6f6f6] z-40 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <Link to="/" className="text-xl font-semibold">
              RiverIsland
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-6 mt-12 ml-5 text-lg">
            <li>
              <Link
                to="/women"
                className="text-gray-700 text-2xl font-normal cursor-pointer px-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/men"
                className="text-gray-700 text-2xl font-normal cursor-pointer px-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                Men
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
