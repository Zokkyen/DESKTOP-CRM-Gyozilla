/* eslint-disable no-return-await */
import instance from '../interceptor';

export const createOrder = async (values, token) => {
  return await instance.post('orders', values);
};

export const createOrderLine = async (values, token) => {
  return await instance.post('order_lines', values);
};

export const patchOrder = async (id, data) => {
  return await instance.patch(`orders/${id}`, data);
};

export const getOrder = async (id) => {
  return await instance.get(`orders/${id}`);
};

export const getOrderLinesByOrderId = async (id) => {
  return await instance.get(`order_lines?id_orders=${id}`);
};
// export const getCustomerFromOrder = async (id) => {
//   return await instance.get(`customer?id_orders=${id}`);
// };
export const getCustomerFromOrder = async (id) => {
  try {
    const response = await instance.get(`customers?id_orders=${id}`);
    return response.data; // La fonction renvoie les données du client extraites de la réponse JSON
  } catch (error) {
    console.error('Erreur lors de la récupération du client :', error);
    return null; // En cas d'erreur, la fonction renvoie null ou une valeur par défaut appropriée
  }
};
