import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';
import { addEmployee } from 'renderer/utils/api-call/addEmployee';
import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';
import { deleteEmployee } from 'renderer/utils/api-call/deleteEmployee';
import { Button } from '@mui/material';
import { TextField, Grid } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CrudEmployee() {
  const [employees, setEmployees] = useState([]);
  const [reload, setReload] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    id_roles: 1,
  });

  const roles = {
    1: 'Préparateur de commande',
    2: 'Cuisinier',
    3: 'Manager',
    4: 'Gérant',
  };

  const roleTemplate = (rowData) => {
    return roles[rowData.id_roles] || 'Role non défini';
  };

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
    getAllEmployees().then((data) => {
      setEmployees(data.data);
    });
  }, [reload]);

  // Mise en place du scroll pour le CRUD
  const ScrollCrud = () => {
    return (
      <div
        style={{
          overflow: 'auto',
          width: '110%',
          height: '600px',
          marginTop: 100,
        }}
      >
        <div className="card">
          <DataTable value={employees} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="Id" style={{ color: 'green' }}></Column>
            <Column field="lastname" header="Nom"></Column>
            <Column field="firstname" header="Prénom"></Column>
            <Column
              field="id_roles"
              style={{ color: 'blue' }}
              header="Rôle"
              body={roleTemplate}
            ></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Téléphone"></Column>
            <Column header="Modifier" body={editButtonTemplate}></Column>
            <Column header="Supprimer" body={deleteButtonTemplate}></Column>
          </DataTable>
        </div>
      </div>
    );
  };
  // ------------------------------------------------------

  // Fonction pour gérer la création d'un nouvel employé
  const handleCreateEmployee = () => {
    addEmployee(formData).finally(() => {
      setReload(true);
      setShowCreateForm(false);
      setFormData({
        lastname: '',
        firstname: '',
        id_roles: '',
        email: '',
        phone: '',
      });
    });
  };
  // ------------------------------------------------------

  // Fonction pour modifier un employé en fonction de son ID
  const handleEditEmployee = (id, updatedEmployee) => {
    // Trouver l'employé correspondant à l'ID dans le tableau 'employees'
    updateEmployee(id, updatedEmployee).finally(() => {
      setReload(true);
      setShowEditForm(false);
      setFormData({
        lastname: '',
        firstname: '',
        id_roles: '',
        email: '',
        phone: '',
      });
    });
  };

  // Appeler l'API pour mettre à jour l'employé
  // updateEmployee(id, updatedEmployee).finally(() => {
  //   setReload(true);
  // });

  // console.log(`Modifier l'employé avec l'ID : ${id}`);

  // ------------------------------------------------------

  // Fonction pour supprimer un employé en fonction de son ID
  const handleDeleteEmployee = (id) => {
    setEmployeeToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteEmployee = () => {
    deleteEmployee(employeeToDelete).then(() => {
      setReload(true);
    });
    console.log(`Supprimer l'employé avec l'ID : ${employeeToDelete}`);
    setShowConfirmDialog(false);
  };

  const cancelDeleteEmployee = () => {
    setShowConfirmDialog(false);
  };

  const deleteConfirmDialog = (
    <Dialog
      visible={showConfirmDialog}
      style={{ width: '450px' }}
      header="Confirmation"
      modal
      onHide={() => setShowConfirmDialog(false)}
      footer={
        <div>
          <Button
            onClick={confirmDeleteEmployee}
            color="primary"
            variant="contained"
            style={{ backgroundColor: 'green' }}
          >
            Oui
          </Button>
          <Button
            onClick={cancelDeleteEmployee}
            color="secondary"
            variant="contained"
            style={{ marginLeft: '10px', backgroundColor: 'red' }}
          >
            Non
          </Button>
        </div>
      }
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: '2rem' }}
        />
        <span>Êtes-vous sûr de vouloir supprimer cet employé ?</span>
      </div>
    </Dialog>
  );

  // ------------------------------------------------------

  // Fonction pour gérer l'affichage du formulaire de création
  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };
  // ------------------------------------------------------

  // Fonction pour gérer l'affichage du formulaire de modification
  const handleShowEditForm = (id) => {
    const employeeToUpdate = employees.find((employee) => employee.id === id);

    if (!employeeToUpdate) {
      console.error(`Employé avec l'ID ${id} introuvable.`);
    } else {
      setShowEditForm(true);
      setFormData(employeeToUpdate);
    }
  };
  // ------------------------------------------------------

  // Fonction pour gérer les changements de saisie dans les formulaires
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // ------------------------------------------------------

  // Template pour le bouton de modification
  const editButtonTemplate = (rowData) => {
    return (
      // <Button
      //   variant="contained"
      //   color="primary"
      //   icon="pi pi-pencil"
      //   rounded={true}
      //   aria-label="Modifier"
      //   style={{ backgroundColor: 'orange', color: 'white' }}
      //   onClick={() => handleShowEditForm(rowData.id)}
      // >
      //   Modifier
      // </Button>
      <IconButton
        color="primary"
        onClick={() => handleShowEditForm(rowData.id)}
      >
        <EditIcon style={{ color: 'orange' }} />
      </IconButton>
    );
  };
  // ------------------------------------------------------

  // Template pour le bouton de suppression
  const deleteButtonTemplate = (rowData) => {
    return (
      // <Button
      //   icon="pi pi-times"
      //   rounded={true}
      //   severity="danger"
      //   aria-label="Supprimer"
      //   variant="contained"
      //   style={{ backgroundColor: 'red', color: 'white' }}
      //   color="secondary"
      //   onClick={() => handleDeleteEmployee(rowData.id)}
      // >
      //   Supprimer
      // </Button>
      <IconButton
        color="secondary"
        onClick={() => handleDeleteEmployee(rowData.id)}
      >
        <DeleteIcon style={{ color: 'red' }} />
      </IconButton>
    );
  };
  // ------------------------------------------------------

  // Formulaire de création
  const createForm = showCreateForm && (
    <div>
      <h2>Créer un nouvel employé</h2>
      <div
        className="inputForm"
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <input
          placeholder="Nom"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          placeholder="Prénom"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          placeholder="Rôle"
          type="text"
          name="id_roles"
          value={formData.id_roles}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Téléphone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button
          icon="pi pi-times"
          rounded={true}
          severity="danger"
          aria-label="Créer"
          variant="contained"
          color="secondary"
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={handleCreateEmployee}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
  // ------------------------------------------------------

  // Formulaire de modification
  const editForm = showEditForm && (
    <div>
      <h2>Modifier l'employé</h2>
      <div
        className="inputForm"
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <input
          placeholder="Nom"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          placeholder="Prénom"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          placeholder="Rôle"
          type="text"
          name="id_roles"
          value={formData.id_roles}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Téléphone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Button
          icon="pi pi-times"
          rounded={true}
          severity="danger"
          aria-label="Modifier"
          variant="contained"
          color="secondary"
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => handleEditEmployee(formData.id, formData)}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
  // ------------------------------------------------------

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ScrollCrud />
      {createForm}
      {editForm}
      {deleteConfirmDialog}
      {/* <Button
        style={{
          marginBottom: 20,
          marginLeft: 420,
          backgroundColor: 'blue',
          color: 'white',
        }}
        variant="contained"
        color="primary"
        onClick={handleShowCreateForm}
      >
        Créer un nouvel employé
      </Button> */}
      <IconButton onClick={handleShowCreateForm}>
        <AddCircleIcon
          style={{ color: 'blue', fontSize: '40', alignSelf: 'center' }}
        />{' '}
      </IconButton>
      <span style={{ color: 'blue', fontWeight: 'bold', fontSize: 20 }}>
        Ajouter un employé
      </span>
    </div>
  );
}
