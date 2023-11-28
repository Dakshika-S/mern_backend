import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
import { current } from "@reduxjs/toolkit";

export const getProducts = (keyword, currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest()); //productsRequest(payload will be defined here)
    let link = `/api/v1/products?page=${currentPage}`;
    // const { data } = await axios.get("/api/v1/products?page=${currentPage}`");
    if (keyword) {
      // link = `${link}&keyword=${keyword}`;
      link += `&keyword=${keyword}`;
    }
    const { data } = await axios.get(link);
    dispatch(productsSuccess(data));
  } catch (error) {
    //handle error
    dispatch(productsFail(error.response.data.message));
  }
};
