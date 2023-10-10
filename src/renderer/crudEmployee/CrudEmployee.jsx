import React, { useEffect, useState } from 'react';
import './CrudEmployee.css';
import { getAllEmployees } from '../utils/api-call/getAllEmployees';
import { addEmployee } from '../utils/api-call/addEmployee';
import { updateEmployee } from '../utils/api-call/updateEmployee';
import { deleteEmployee } from '../utils/api-call/deleteEmployee';

export default function CrudEmployee() {
  //Récupération des employés----------------
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getAllEmployees().then((data) => {
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
      lastname: 'Tara',
      firstname: 'Dave',
      phone: '0909090909',
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
            <th> Modification </th>
            <th> Suppression </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.lastname}</td>
                <td>{item.firstname}</td>
                <td>{item.phone}</td>
                <td>{item.id}</td>
                <td>
                  <button
                    onClick={() => {
                      handleUpdateEmployee(item.id);
                      console.log('update!');
                    }}
                  >
                    Modifier
                  </button>
                </td>
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
      <button
        id="add-employee"
        onClick={() => {
          handleAddEmployee();
          console.log('create!');
        }}
      >
        Ajouter un employé
      </button>
    </div>
  );
}
