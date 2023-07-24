import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';
import { addEmployee } from 'renderer/utils/api-call/addEmployee';
import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';

export default function Dashboard() {
  //Récupération des employés----------------
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployees().then((data) => {
      console.log(data.data);
      setEmployees(data.data);
    });
  }, []);
  // -----------------------------------------

  //Création d'un nouvel employé--------------
  const handleAddEmployee = () => {
    const newEmployee = {
      lastname: 'Doe',
      firstname: 'John',
      phone: '123456789',
    };
    addEmployee(newEmployee).then(() => {
      getAllEmployees().then((data) => {
        setEmployees(data.data);
      });
    });
  };
  // -------------------------------------------

  //Mise à jour d'un employé--------------------
  const handleUpdateEmployee = (id) => {
    const updatedEmployee = {
      lastname: 'Smith',
    };

    updateEmployee(id, updatedEmployee).then(() => {
      getAllEmployees().then((data) => {
        setEmployees(data.data);
      });
    });
  };
  // --------------------------------------------

  //Suppression d'un employé----------------------
  const handleDeleteEmployee = (id) => {
    deleteEmployee(id).then(() => {
      getAllEmployees().then((data) => {
        setEmployees(data.data);
      });
    });
  };
  // ---------------------------------------------

  return (
    <div className="dashboard">
      <h1>Tableau de bord de gestion des employés</h1>
      <table id="employee-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => {
            return (
              <tr>
                <td>{item.lastname}</td>
                <td>{item.firstname}</td>
                <td>{item.phone}</td>
                <td>{item.id}</td>
                <td>
                  <button onClick={() => handleDeleteEmployee(item.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button id="add-employee" onClick={handleAddEmployee}>
        Ajouter un employé
      </button>

      <tbody>
        {employees.map((item) => {
          return (
            <tr>
              <td onClick={() => handleUpdateEmployee(item.id)}>
                {item.lastname}
              </td>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
}
