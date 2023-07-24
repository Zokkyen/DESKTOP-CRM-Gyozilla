import instance from '../interceptor';

export const getAllEmployees = () => {
  return instance.get('employees').catch((error) => {
    console.error('Erreur lors de la récupération des employés', error);
  });
};
