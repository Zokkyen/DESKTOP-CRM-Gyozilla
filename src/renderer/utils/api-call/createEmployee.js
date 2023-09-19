import instance from '../interceptor';

export const createEmployee = async (values) => {
  return await instance.post('employees/', values);
};
