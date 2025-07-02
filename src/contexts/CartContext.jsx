import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [localCart, setLocalCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  const addToLocalCart = (prodId) => {
    const existing = localCart.find((i) => i.productId === prodId);
    let updatedCart;
    if (existing) {
      updatedCart = localCart.map((i) =>
        i.productId === prodId ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...localCart, { productId: prodId, quantity: 1 }];
    }
    setLocalCart(updatedCart);
  };

  const decreaseFromLocalCart = (prodId) => {
    const updatedCart = localCart
      .map((i) =>
        i.productId === prodId ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    setLocalCart(updatedCart);
  };

  const deleteLocalCartItem = (prodId) => {
    const updatedCart = localCart.filter((i) => i.productId !== prodId);
    setLocalCart(updatedCart);
  };

  const localCartCount = localCart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        localCart,
        setLocalCart,
        addToLocalCart,
        decreaseFromLocalCart,
        deleteLocalCartItem,
        localCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useLocalCart = () => useContext(CartContext);
