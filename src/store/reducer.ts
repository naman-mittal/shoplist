import {combineReducers} from '@reduxjs/toolkit';

import LoginReducer from './slices/LoginSlice';
import GroceryReducer from './slices/GrocerySlice';

const reducer = combineReducers({
  login: LoginReducer,
  grocery: GroceryReducer,
});

export default reducer;
