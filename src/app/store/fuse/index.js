import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';
import dialog from './dialogSlice';

const fuseReducers = combineReducers({
  navigation,
  settings,
  navbar,
  message,
  dialog
});

export default fuseReducers;
