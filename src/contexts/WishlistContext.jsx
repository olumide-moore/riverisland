import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [localWishlist, setLocalWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  }, [localWishlist]);

  const toggleLocalWishlist = (prodId) => {
     
      const isInWishlist = localWishlist.includes(prodId);

      const updatedWishlist = isInWishlist
        ? localWishlist.filter((id) => id !== prodId)
        : [...localWishlist, prodId];
        setLocalWishlist(updatedWishlist);
        return !isInWishlist;
  };


  return (
    <WishlistContext.Provider
      value={{
        localWishlist,
        setLocalWishlist,
        toggleLocalWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useLocalWishlist = () => useContext(WishlistContext);
