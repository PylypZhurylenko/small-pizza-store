import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63ce8f34d2e8c29a9bda01e9.mockapi.io/products`,
      {
        params: pickBy(
          {
            page: currentPage,
            limit: 6,
            category,
            sortBy,
            order,
            search,
          },
          identity
        ),
      }
    );
    return data;
  }
);
