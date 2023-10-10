/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { Button, TextField, Grid } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEmployee } from 'renderer/utils/api-call/deleteEmployee';
import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';
import { addEmployee } from 'renderer/utils/api-call/addEmployee';
import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';

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

  const formContainerStyles = {
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '1em',
    border: '1px solid #ccc',
    borderRadius: '4px',
    margin: '1em 0',
    alignSelf: 'center',
  };

  // Mise en place du scroll pour le CRUD
  function ScrollCrud() {
    return (
      <div
        style={{
          overflow: 'auto',
          width: '110%',
          height: '600px',
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            marginBottom: 30,
          }}
        >
          <div className="formContainerStyles">
            {createForm}
            {editForm}
          </div>
        </div>
        <div className="card">
          <DataTable value={employees} tableStyle={{ minWidth: '50rem' }}>
            <Column
              field="id"
              header="Id"
              style={{ color: 'blue', fontWeight: 'bold' }}
            />
            <Column field="lastname" header="Nom" />
            <Column field="firstname" header="Prénom" />
            <Column
              field="id_roles"
              style={{ color: 'green', fontWeight: 'bold' }}
              header="Rôle"
              body={roleTemplate}
            />
            <Column field="email" header="Email" />
            <Column field="phone" header="Téléphone" />
            <Column header="Modifier" body={editButtonTemplate} />
            <Column header="Supprimer" body={deleteButtonTemplate} />
          </DataTable>
        </div>

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            name="lastname"
            label="Nom"
            fullWidth
            variant="outlined"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="firstname"
            label="Prénom"
            fullWidth
            variant="outlined"
            value={formData.firstname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="id_roles"
            label="Rôle"
            fullWidth
            variant="outlined"
            value={formData.id_roles}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="phone"
            label="Téléphone"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreateEmployee}
          >
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
  // ------------------------------------------------------

  // Formulaire de modification

  const editForm = showEditForm && (
    <div>
      <h2>Modifier l'employé</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            name="lastname"
            label="Nom"
            fullWidth
            variant="outlined"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="firstname"
            label="Prénom"
            fullWidth
            variant="outlined"
            value={formData.firstname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="id_roles"
            label="Rôle"
            fullWidth
            variant="outlined"
            value={formData.id_roles}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="phone"
            label="Téléphone"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleEditEmployee(formData.id, formData)}
          >
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
  // ------------------------------------------------------

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollCrud />
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
    </div>
  );
}
