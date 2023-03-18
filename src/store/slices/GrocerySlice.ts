import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroceryItem} from '../../database/models/GroceryItem';

interface LoginInitialState {
  isLoading: boolean;
  groceryItems: GroceryItem[];
  error: {error: string} | null;
}

const initialState: LoginInitialState = {
  isLoading: false,
  groceryItems: [],
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setGroceryItems: (state, action) => {
      state.groceryItems = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    addItem: (state, action) => {
      state.groceryItems = [...state.groceryItems, action.payload];
      state.isLoading = false;
    },

    deleteItem: (state, action) => {
      state.groceryItems = state.groceryItems.filter(
        item => item.id !== action.payload,
      );
      state.isLoading = false;
    },

    updateItem: (state, action: PayloadAction<GroceryItem>) => {
      const index = state.groceryItems.findIndex(
        item => item.id === action.payload.id,
      );

      state.groceryItems[index] = action.payload;
      state.isLoading = false;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
  setGroceryItems,
  setLoading,
  addItem,
  deleteItem,
  updateItem,
  setError,
  reset,
} = loginSlice.actions;

export default loginSlice.reducer;
