import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
  deleteDatabase,
} from 'react-native-sqlite-storage';
import {
  DATABASE_NAME,
  GROCERIES_TABLE,
  GROCERIES_TABLE_FIELDS,
  USERS_TABLE,
  USERS_TABLE_FIELDS,
} from '../constants/DBConstants';
import {addUser} from './queries/userOperations';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: DATABASE_NAME, location: 'default'});
};

export const deleteDB = async () => {
  return deleteDatabase({name: DATABASE_NAME, location: 'default'});
};

export const createTables = async (db: SQLiteDatabase) => {
  const userQuery = `CREATE TABLE IF NOT EXISTS ${USERS_TABLE}(
        ${USERS_TABLE_FIELDS.USER_ID} INTEGER PRIMARY KEY AUTOINCREMENT, 
        ${USERS_TABLE_FIELDS.NAME} TEXT, 
        ${USERS_TABLE_FIELDS.EMAIL} TEXT NOT NULL UNIQUE, 
        ${USERS_TABLE_FIELDS.PASSWORD} TEXT
    );`;

  const groceryQuery = `CREATE TABLE IF NOT EXISTS ${GROCERIES_TABLE}(
        ${GROCERIES_TABLE_FIELDS.ITEM_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${GROCERIES_TABLE_FIELDS.USER_ID} INTEGER,  
        ${GROCERIES_TABLE_FIELDS.ITEM_NAME} TEXT, 
        ${GROCERIES_TABLE_FIELDS.ITEM_QUANTITY} TEXT, 
        ${GROCERIES_TABLE_FIELDS.BOUGHT} INTEGER DEFAULT 0
    );`;

  await db.executeSql(userQuery);
  await db.executeSql(groceryQuery);
};

export const initializeDB = async (db: SQLiteDatabase) => {
  await addUser(db, {
    name: 'Naman Mittal',
    email: 'namanmittal321@gmail.com',
    password: 'pass123',
  });
  await addUser(db, {
    name: 'Mona Kumari',
    email: 'monakumari321@gmail.com',
    password: 'pass123',
  });
};
