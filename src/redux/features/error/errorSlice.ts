import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  message: string | null;
  statusCode: number | null;
  timestamp: number | null;
}

const initialState: ErrorState = {
  message: null,
  statusCode: null,
  timestamp: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ message: string; statusCode?: number }>
    ) => {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode || null;
      state.timestamp = Date.now();
    },
    clearError: (state) => {
      state.message = null;
      state.statusCode = null;
      state.timestamp = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
