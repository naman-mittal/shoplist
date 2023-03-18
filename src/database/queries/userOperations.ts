import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {USERS_TABLE, USERS_TABLE_FIELDS} from '../../constants/DBConstants';
import {User} from '../models/User';

const {EMAIL, NAME, PASSWORD} = USERS_TABLE_FIELDS;

export const addUser = async (
  db: SQLiteDatabase,
  user: User,
): Promise<void> => {
  const addQuery = `INSERT INTO ${USERS_TABLE}(${NAME}, ${EMAIL}, ${PASSWORD}) values ('${user.name}','${user.email}', '${user.password}') `;

  await db.executeSql(addQuery);
};

export const findUser = async (
  db: SQLiteDatabase,
  email: string,
  password: string,
): Promise<User> => {
  const findQuery = `SELECT * FROM ${USERS_TABLE} WHERE ${EMAIL} = "${email}" LIMIT 1`;

  const resultSet = await db.executeSql(findQuery);

  const user: User = resultSet[0].rows.item(0);

  if (!user) {
    return Promise.reject(new Error('email not registered'));
  }

  if (password !== user.password) {
    return Promise.reject(new Error('incorrect password'));
  }

  return user;
};
