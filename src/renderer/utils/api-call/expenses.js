/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import instance from '../interceptor';

export const getAllExpenses = () => {
  return instance.get('expenses');
};

export const getAllExpenseByExpenseType = async (id) => {
  return await instance.get(`expenses/expense_types/${id}`);
};
