import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/api';

export const getAllModel = createAsyncThunk('/api/pandora_model/all', async () => {
  const response = await api.get(`/api/pandora_model/all`);
  return response.data;
});

export const {
  setIsNewLoading,
  setPageNumber,
  setScrollPos,
  refreshScrollPos,
  setError,
  setCopiedPrompt,
  setCopiedURL,
  // eslint-disable-next-line no-undef
} = mainSlice.actions;

// eslint-disable-next-line no-undef
export default mainSlice.reducer;
