/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
import instance from '../interceptor';

export const getStockByFranchise = async (franchiseId) => {
  return await instance.get(`stock/franchise/${franchiseId}`);
};
