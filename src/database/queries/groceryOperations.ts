import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {
  GROCERIES_TABLE,
  GROCERIES_TABLE_FIELDS,
} from '../../constants/DBConstants';
import {GroceryItem} from '../models/GroceryItem';

const {ITEM_ID, ITEM_NAME, ITEM_QUANTITY, BOUGHT, USER_ID} =
  GROCERIES_TABLE_FIELDS;

export const addGroceryItem = async (
  db: SQLiteDatabase,
  item: GroceryItem,
): Promise<GroceryItem> => {
  const addQuery = `INSERT INTO ${GROCERIES_TABLE}(${ITEM_NAME}, ${ITEM_QUANTITY}, ${USER_ID}) values ('${item.name}','${item.quantity}', ${item.userId}) `;

  const resultSet = await db.executeSql(addQuery);

  const findQuery = `SELECT * FROM ${GROCERIES_TABLE} WHERE ${ITEM_ID} = "${resultSet[0].insertId}" LIMIT 1`;

  const resultSet1 = await db.executeSql(findQuery);
  if (!resultSet1 || !resultSet1[0].rows.length) {
    return Promise.reject(new Error('could not add the grocery item'));
  }

  console.log(resultSet1[0]);

  return resultSet1[0].rows.item(0);
};

export const getGroceryItemsForUser = async (
  db: SQLiteDatabase,
  userId: number,
): Promise<GroceryItem[]> => {
  const items: GroceryItem[] = [];

  const findQuery = `SELECT * FROM ${GROCERIES_TABLE} WHERE ${USER_ID} = "${userId}"`;

  const resultSet = await db.executeSql(findQuery);

  resultSet.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      items.push(result.rows.item(index));
    }
  });

  return items;
};

export const updateGroceryItem = async (
  db: SQLiteDatabase,
  updatedItem: GroceryItem,
): Promise<void> => {
  const updateQuery = `UPDATE ${GROCERIES_TABLE} SET ${ITEM_NAME} = "${
    updatedItem.name
  }", ${ITEM_QUANTITY} = "${updatedItem.quantity}", ${BOUGHT} = ${
    updatedItem.hasBought ? 1 : 0
  } WHERE ${ITEM_ID} = ${updatedItem.id}`;

  await db.executeSql(updateQuery);
};

export const deleteGroceryItem = async (
  db: SQLiteDatabase,
  itemId: number,
): Promise<void> => {
  const deleteQuery = `DELETE FROM ${GROCERIES_TABLE} WHERE ${ITEM_ID} = ${itemId}`;

  try {
    await db.executeSql(deleteQuery);
  } catch (err) {
    console.log('err', err);
    return Promise.reject(new Error('could not delete the user'));
  }
};
