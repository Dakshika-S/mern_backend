import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
import { current } from "@reduxjs/toolkit";

export const getProducts = (currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest()); //productsRequest(payload will be defined here)
    let link = `/api/v1/products?page=${currentPage}`;
    // const { data } = await axios.get("/api/v1/products");
    const { data } = await axios.get(link);
    console.log(data, "get products");
    dispatch(productsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(productsFail(error.response.data.message));
  }
};
