import { combineReducers } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';

const reducer = combineReducers({
  homeSlice,
});
export default reducer;
