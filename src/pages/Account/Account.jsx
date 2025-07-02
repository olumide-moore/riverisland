import { useState } from "react";
import AccountOverview from "./AccountOverview";
import { MdKeyboardArrowRight } from "react-icons/md";
import MyDetails from "./MyDetails";
import LoginDetails from "./LoginDetails";
import MyPurchases from "./MyPurchases";
import { useNavigate } from "react-router-dom";
import { useLocalCart } from "../../contexts/CartContext";

const Account = () => {
  const tabs = {
    "Account overview": <AccountOverview />,
    //   "Unlimited Delivery",
    "My details": <MyDetails />,
    "Login details": <LoginDetails />,
    "My purchases": <MyPurchases />,
    // "Address book":<></>,
    // "Payment & billing":<></>,
    // "Newsletter preferences":<></>
  };
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);
  const navigate = useNavigate();
    const {setLocalCart} =useLocalCart()
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("wishlist");

    setLocalCart([]);
    navigate("/login");
  };

  return (
    <div className="text-black font-normal md:mx-auto px-4 sm:px-8 md:px-0 lg:px-28 my-10">
      <div className="flex flex-col md:flex-row mx-auto">
        {/* Sidebar */}
        <aside className="bg-white w-full md:w-2/5 p-3 md:max-w-[350px]">
          <div className="flex justify-between items-center mb-8  border border-gray-300 rounded-md px-4 py-5">
            <h2 className="text-xl font-medium">Olu</h2>
            <p className="text-xs font-normal">My Account ID ▣</p>
          </div>
          <nav className="flex md:flex-col gap-4 md:gap-0 overflow-x-auto md:overflow-x-hidden no-scrollbar ">
            {Object.keys(tabs).map((item) => (
              <div
                key={item}
                className={`flex justify-between items-center text-nowrap p-3 text-sm md:text-[15px] font-bold text-black cursor-pointer uppercase md:normal-case ${
                  item == selectedTab
                    ? "md:bg-[#f7f3ed] border border-black md:border-0"
                    : "md:hover:bg-[#f7f3ed] md:font-medium"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTab(item);
                }}
              >
                <span>{item}</span>
                {/* {i !== 0 && <span>&gt;</span>} */}
                {item !== selectedTab && (
                  <MdKeyboardArrowRight className="hidden md:block" size={20} />
                )}
              </div>
            ))}
          </nav>
        </aside>

        {tabs[selectedTab]}
      </div>
      {/* Help Section */}
      <div className="mt-10 md:mt-0 text-sm flex flex-col px-5 gap-4 md:mx-auto">
        <h3 className="font-medium text-xl mb-3">NEED SOME HELP?</h3>
        <button className="bg-[#f7f3ed] py-3 w-48 mb-3 text-base rounded-3xl ">
          Where is my order?
        </button>
        <a
          href="#"
          className="block underline underline-offset-4 font-bold mb-2"
        >
          View all FAQs
        </a>
        <a
          href="#"
          onClick={handleLogout}
          className="block underline underline-offset-4 font-bold mb-2"
        >
          Sign out
        </a>
      </div>
    </div>
  );
};

export default Account;
