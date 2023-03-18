export const DATABASE_NAME = 'shoplist';
export const USERS_TABLE = 'users';
export const GROCERIES_TABLE = 'groceries';

export const USERS_TABLE_FIELDS = {
  USER_ID: 'userId',
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const GROCERIES_TABLE_FIELDS = {
  ITEM_ID: 'id',
  USER_ID: USERS_TABLE_FIELDS.USER_ID,
  ITEM_NAME: 'name',
  ITEM_QUANTITY: 'quantity',
  BOUGHT: 'hasBought',
};
