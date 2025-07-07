import axios from "axios";
import { useEffect, useState } from "react";
import { BsHeartbreakFill } from "react-icons/bs";
import CartItem from "../components/cart/CartItem";
import { PiBagLight, PiLockKey } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useGetUserCartQuery,
  useAddToCartMutation,
  useDecreaseFromCartMutation,
  useDeleteCartItemMutation,
} from "../features/cartSlice";
import { useLocalCart } from "../contexts/CartContext";
import { useGetProductsMutation } from "../features/productSlice";

const CartPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const { data: serverCart, isLoading: cartLoading } = useGetUserCartQuery(
    userId,
    { skip: !userId }
  );
  const [getProducts, { isLoading: productsLoading }] =
    useGetProductsMutation();

  const [addToCart] = useAddToCartMutation();
  const [decreaseFromCart] = useDecreaseFromCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const {
    localCart,
    addToLocalCart,
    decreaseFromLocalCart,
    deleteLocalCartItem,
  } = useLocalCart();

  const handleIncrease = (productId) => {
    if (userId) {
      addToCart({ userId, productId });
    } else {
      addToLocalCart(productId);
    }
  };

  const handleDecrease = (productId) => {
    if (userId) {
      decreaseFromCart({ userId, productId });
    } else {
      decreaseFromLocalCart(productId);
    }
  };

  const handleDelete = (productId) => {
    if (userId) {
      deleteCartItem({ userId, productId });
    } else {
      deleteLocalCartItem(productId);
    }
  };

  const [cartItems, setCartItems] = useState([]);

  function calculateTotal() {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const cartProducts = userId ? serverCart?.products || [] : localCart;
        const productIds = cartProducts.map((item) => item.productId);
        const products = await getProducts(productIds).unwrap();

        const cartItems = cartProducts.map((item) => ({
          ...item,
          ...products.find((product) => product._id === item.productId),
        }));
        setCartItems(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    getCartItems();
  }, [serverCart, localCart]);

  if (cartLoading || productsLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    
    <div className="mx-14 mt-8 mb-20">
      <h2 className="text-3xl font-open-sans font-medium text-center">Bag</h2>
      {cartItems.length > 0 ? (
        <div className="lg:flex lg:justify-center lg:gap-20">
          <div className="flex flex-col box-border mt-10">
            {cartItems.map((item) => (
              <CartItem
                key={item?.productId}
                item={item}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <div className="lg:border rounded-md mt-8  lg:mt-14 lg:p-5 w-full max-w-md bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Summary</h2>

            <div className="flex justify-between items-center font-normal text-sm border-b py-4">
              <span>Sub-total</span>
              <span className="font-medium">{`£${calculateTotal()}`}</span>
            </div>

            <div className="flex justify-between font-normal text-sm mb-4 border-b py-4">
              <span>Delivery</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>

            <div className="flex justify-between text-base font-semibold mb-6">
              <span>Total (Excluding delivery)</span>
              <span>{`£${calculateTotal()}`}</span>
            </div>

            <div className="text-xs text-gray-700 mb-6">
              <p className="font-semibold">UK Delivery Methods</p>
              <p className="mt-2 font-semibold">Home Delivery</p>
              <p>
                Standard UK delivery: <strong>£4</strong>
              </p>
              <p>
                Next or nominated day: <strong>£6</strong> (
                <span className="font-semibold">order by 10pm</span>)
              </p>
              <p className="mt-2 font-semibold">Collection</p>
              <p>
                River Island store: <strong>£1</strong> or free over{" "}
                <strong>£20</strong>
              </p>
              <p>
                Local shop: <strong>£4</strong> or free over{" "}
                <strong>£50</strong>
              </p>
            </div>

            <button className="w-full bg-yellow-300 bg-opacity-90 transition-colors text-black text-base font-normal py-3 text-center flex items-center justify-center gap-2">
              <PiLockKey size={18} />
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 max-w-[280px] mx-auto mt-6 flex flex-col gap-8 items-center">
          <PiBagLight size={50} />
          <p className="text-lg font-normal ">YOUR BAG IS EMPTY</p>
          <p className="text-sm font-normal ">Let's change that!</p>
          <p className="text-sm font-normal ">Not sure where to start?</p>
          <Link
            className="bg-black text-white text-sm font-bold w-full p-3"
            to={`/`}
          >
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
