import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants/url";

const initialState = {
  userData: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
};

// login
export const login = createAsyncThunk(
  "login",

  async (params, { rejectWithValue, getState }) => {
    try {
      console.log("Sending login request with params:", params);
      const response = await axios.post(`${REACT_APP_BASE_URL}/login`, params);
      console.log("Login response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Login failed xx:", error);
      window.alert("Login failed. Please check your credentials.");

      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// logout
export const logout = createAsyncThunk(
  "logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log("Logging out...");

      // Access the current state to get the user data
      const currentState = getState();

      //reset userData to null
      currentState.authSlice.userData = null;

      return true; // Indicate successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred during logout"
      );
    }
  }
);

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // console.log("Login rejected with error:", action.error.message);
      })
      .addCase(logout.pending, (state) => {
        // Add any loading state for logout if needed
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear user data or perform any additional cleanup
        state.userData = null;
        state.isSuccess = false;
        console.log("Logout successful");
      })
      .addCase(logout.rejected, (state, action) => {
        console.error("Logout failed:", action.error.message);
      });
  },
});

export default AuthSlice.reducer;
