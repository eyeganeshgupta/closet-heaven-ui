import { createAsyncThunk } from "@reduxjs/toolkit";

// * reset error action
export const resetErrorAction = createAsyncThunk("reset-error-action", () => {
  return {};
});

// * reset success action
export const resetSuccessAction = createAsyncThunk(
  "reset-success-action",
  () => {
    return {};
  }
);
