import instance from '../interceptor';

export const getAllOrdersByFranchise = async (id) => {
  return await instance.get(`orders/franchise/${id}`);
};
