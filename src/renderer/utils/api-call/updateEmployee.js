/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import instance from '../interceptor';

export const updateEmployee = (id, updatedEmployee) => {
  return instance.patch(`employees/${id}`, updatedEmployee).catch((error) => {
    console.error("Erreur lors de la mise à jour de l'employé", error);
  });
};
