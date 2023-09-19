import instance from '../interceptor';

export const deletedEmployee = (id) => {
  return instance.delete(`employees/${id}`).catch((error) => {
    console.error("Erreur lors de la suppression de l'employé", error);
  });
};
