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
  },
});

const { actions, reducer } = cartSlice;

export const { addCartItemRequest, addCartItemSuccess } = actions;

export default reducer;
