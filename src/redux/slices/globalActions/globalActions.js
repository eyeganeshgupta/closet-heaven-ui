import { createAsyncThunk } from "@reduxjs/toolkit";

// * reset error action
export const resetErrorAction = createAsyncThunk("reset-error-action", () => {
  return {};
});
