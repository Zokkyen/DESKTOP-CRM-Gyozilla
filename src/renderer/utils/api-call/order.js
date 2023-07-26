import instance from '../interceptor';

export const createOrder = async (values, token) => {
  return await instance.post('orders', values);
};

export const createOrderLine = async (values, token) => {
  return await instance.post('order_lines', values);
};
