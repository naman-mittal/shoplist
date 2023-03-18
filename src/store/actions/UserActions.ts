import {getDBConnection} from '../../database/database';
import {findUser} from '../../database/queries/userOperations';
import {
  setUserData,
  clearUserData,
} from '../../services/asyncStorage/UserServices';
import {loginFailed, loginSuccess, logoutSuccess} from '../slices/LoginSlice';
import {reset} from '../slices/GrocerySlice';

export const login =
  (email: string, password: string) =>
  async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    const dbConnection = await getDBConnection();

    findUser(dbConnection, email, password)
      .then(user => {
        setUserData(user);

        dispatch(loginSuccess(user));
      })
      .catch(err => {
        dispatch(loginFailed({error: err.message}));
        console.log(err.message);
      });
  };

export const logout =
  () => async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    dispatch(logoutSuccess());
    dispatch(reset());
    clearUserData();
  };
