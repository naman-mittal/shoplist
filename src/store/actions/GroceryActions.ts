import {getDBConnection} from '../../database/database';
import {GroceryItem} from '../../database/models/GroceryItem';
import {
  getGroceryItemsForUser,
  addGroceryItem as addGroceryItemDB,
  deleteGroceryItem as deleteGroceryItemDB,
  updateGroceryItem as updateGroceryItemDB,
} from '../../database/queries/groceryOperations';
import {
  addItem,
  deleteItem,
  setError,
  setGroceryItems,
  setLoading,
  updateItem,
} from '../slices/GrocerySlice';

export const fetchGroceryItems =
  (userId: number) =>
  async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    dispatch(setLoading(true));
    const dbConnection = await getDBConnection();

    getGroceryItemsForUser(dbConnection, userId)
      .then(items => {
        dispatch(setGroceryItems(items));
      })
      .catch(err => {
        dispatch(setError(err));
      });
  };

export const addGroceryItem =
  (item: GroceryItem) =>
  async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    dispatch(setLoading(true));
    const dbConnection = await getDBConnection();

    addGroceryItemDB(dbConnection, item)
      .then(addedItem => {
        console.log('added Item', addedItem);
        dispatch(addItem(addedItem));
      })
      .catch(err => {
        dispatch(setError(err));
      });
  };

export const updateGroceryItem =
  (item: GroceryItem) =>
  async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    dispatch(setLoading(true));
    const dbConnection = await getDBConnection();

    updateGroceryItemDB(dbConnection, item)
      .then(() => {
        dispatch(updateItem(item));
      })
      .catch(err => {
        dispatch(setError(err));
      });
  };

export const deleteGroceryItem =
  (itemId: number) =>
  async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    dispatch(setLoading(true));
    const dbConnection = await getDBConnection();

    deleteGroceryItemDB(dbConnection, itemId)
      .then(() => {
        dispatch(deleteItem(itemId));
      })
      .catch(err => {
        dispatch(setError(err));
      });
  };
