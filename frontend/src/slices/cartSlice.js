import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], //this items will sotred in local storage of  browswer and we get again
    loading: false,
  },
  reducers: {
    addCartItemRequest(state, action) {
      //when adding cart item and sendig req
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;

      const isItemExist = state.items.find((i) => i.product == item.product); //checking whether nely added item available in cart or not
      if (isItemExist) {
        state = {
          //if same item available not adding
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item], // if diff iem available adding to cart
          loading: false,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items)); //and addingitem to browswers local storage
      }
      return state;
    },
    increaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product == action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartItemQty(state, action) {
      state.items = state.items.map((item) => {
        if (item.product == action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const filterItems = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filterItems));
      return {
        ...state,
        items: filterItems,
      };
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemRequest,
  addCartItemSuccess,
  increaseCartItemQty,
  decreaseCartItemQty,
  removeItemFromCart,
} = actions;

export default reducer;
