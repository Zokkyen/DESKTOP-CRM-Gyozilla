export const addEmployee = (newEmployee) => {
  return instance.post('employees', newEmployee).catch((error) => {
    console.error("Erreur lors de l'ajout d'un employé", error);
  });
};
