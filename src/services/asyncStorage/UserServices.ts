import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA} from '../../constants/AsyncConstants';
import {User} from '../../database/models/User';

export const setUserData = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(USER_DATA, JSON.stringify(user));
};

export const clearUserData = async (): Promise<void> => {
  await AsyncStorage.removeItem(USER_DATA);
};

export const getUserData = async (): Promise<User | null> => {
  const user = await AsyncStorage.getItem(USER_DATA);

  if (user) {
    return JSON.parse(user);
  }

  return null;
};
