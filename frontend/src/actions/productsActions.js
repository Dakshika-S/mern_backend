import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";
import { current } from "@reduxjs/toolkit";

export const getProducts =
  (keyword, price, category, rating, currentPage) => async (dispatch) => {
    try {
      dispatch(productsRequest()); //productsRequest(payload will be defined here)
      let link = `/api/v1/products?page=${currentPage}`;
      // const { data } = await axios.get("/api/v1/products?page=${currentPage}`");
      if (keyword) {
        // link = `${link}&keyword=${keyword}`;
        link += `&keyword=${keyword}`;
      }

      if (price && price.length === 2) {
        // && price.length === 2here the logic length is to setupp hpme page not pass the price ifnot the price will be undefined
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) {
        link += `&category=${category}`;
      }
      if (rating) {
        link += `$ratings=${rating}`;
      }
      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      //handle error
      dispatch(productsFail(error.response.data.message));
    }
  };
