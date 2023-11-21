import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = async (dispatch) => {
  try {
    dispatch(productsRequest()); //productsRequest(payload will be defined here)
    const { data } = await axios.get("/api/v1/products");
    console.log(data, "get products");
    dispatch(productsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(productsFail(error.response.data.message));
  }
};
