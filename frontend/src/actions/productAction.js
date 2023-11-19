import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
} from "../slices/productSlice";

export const getProduct = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch(productRequest()); //productsRequest(payload will be defined here)
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log(data);
    dispatch(productSuccess(data));
  } catch (error) {
    //handle error
    dispatch(productFail(error.response.data.message));
  }
};
