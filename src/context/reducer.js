import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from "./actions";

export default (state, action) => {
  switch (action.type) {
    case REMOVE:
      return state.filter((item) => item.id !== action.payload);
    case INCREASE:
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      });
    case DECREASE:
      return state.map((item) => {
        return item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
    case CLEARCART:
      return [];
    case ADDTOCART:
      const {
        id,
        price,
        image: { url },
        title,
      } = action.payload;
      let product = { id, price, image: url, title, amount: 1 };
      return [...state, product];
    case "DEFAULT":
      return state;
    default:
      return state;
  }
};
