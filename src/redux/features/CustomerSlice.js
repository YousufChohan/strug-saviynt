import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants/url";

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

// Fetch customers
export const fetchCustomers = createAsyncThunk(
  "fetchCustomers",

  async (params, { rejectWithValue }) => {
    try {
      // const { token } = params; // Destructure token from params
      //   console.log("Fetching customers with token:", token);

      const response = await axios.get(
        `${REACT_APP_BASE_URL}/customer?userID=later`,
        {}
      );

      return response.data.customers;
    } catch (error) {
      console.error("Fetching customers failed:", error);
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const customersSlice = createSlice({
  name: "customersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetching customers failed:", action.error);
      });
  },
});

export default customersSlice.reducer;
