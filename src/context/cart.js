// cart context
import React from "react";
import reducer from "./reducer";
import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from "./actions";

function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);

    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: id });
    // setCart(...cart.filter((item) => item.id !== id));
    // let newCart = [...cart].filter((item) => item.id !== id);
    // setCart(newCart);
  };
  const increaseAmount = (id, amount) => {
    if (amount === 10) {
      dispatch({ type: "DEFAULT" });
    } else {
      dispatch({ type: INCREASE, payload: id });
      //   const newCart = [...cart].map((item) => {
      //     return item.id === id
      //       ? { ...item, amount: item.amount + 1 }
      //       : { ...item };
      //   });
      //   setCart(newCart);
    }
  };
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      //   removeItem(id);
      dispatch({ type: REMOVE, payload: id });
    } else {
      dispatch({ type: DECREASE, payload: id });
      //   let newCart = [...cart].map((item) => {
      //     return item.id === id
      //       ? { ...item, amount: item.amount - 1 }
      //       : { ...item };
      //   });
      //   setCart(newCart);
    }
  };
  const addToCart = (product) => {
    let item = [...cart].find((item) => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
    } else {
      dispatch({ type: ADDTOCART, payload: product });
    }
    // const {
    //   id,
    //   price,
    //   image: { url },
    //   title,
    // } = product;
    // const item = [...cart].find((item) => item.id === id);
    // if (item) {
    //   console.log(item);
    //   increaseAmount(id, item.amount);
    //   return;
    // } else {
    //   const newItem = { id, image: url, title, price, amount: 1 };
    //   const newCart = [...cart, newItem];
    //   setCart(newCart);
    // }
  };
  const clearCart = () => {
    dispatch({ type: CLEARCART });
    // setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
