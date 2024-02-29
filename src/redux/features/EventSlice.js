import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants/url";

const initialState = {
  events: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

// Fetch events
export const fetchEvents = createAsyncThunk(
  "fetchEvents",

  async (params, { rejectWithValue }) => {
    try {
      // const { token } = params; // Destructure token from params
      //   console.log("Fetching events with token:", token);

      const response = await axios.get(
        `${REACT_APP_BASE_URL}/getcventdata`,
        {}
      );
      // console.log("Events response in Slice File:", response.data[0].data);

      return response.data[0].data;
    } catch (error) {
      console.error("Fetching events failed:", error);
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const eventsSlice = createSlice({
  name: "eventsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Fetching events failed:", action.error);
      });
  },
});

export default eventsSlice.reducer;
