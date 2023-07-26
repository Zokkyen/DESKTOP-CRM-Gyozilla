// import React, { useEffect, useState } from 'react';
// import './CrudEmployee.css';
// import { getAllEmployees } from '../utils/api-call/getAllEmployees';
// import { addEmployee } from '../utils/api-call/addEmployee';
// import { updateEmployee } from '../utils/api-call/updateEmployee';
// import { deleteEmployee } from '../utils/api-call/deleteEmployee';

// export default function CrudEmployee() {
//   //Récupération des employés----------------
//   const [employees, setEmployees] = useState([]);
//   useEffect(() => {
//     getAllEmployees().then((data) => {
//       setEmployees(data.data);
//     });
//   }, []);
//   // -----------------------------------------

//   //Création d'un nouvel employé--------------
//   const handleAddEmployee = () => {
//     const newEmployee = {
//       lastname: 'Doe',
//       firstname: 'John',
//       phone: '123456789',
//     };
//     addEmployee(newEmployee).then(() => {
//       getAllEmployees().then((data) => {
//         setEmployees(data.data);
//       });
//     });
//   };
//   // -------------------------------------------

//   //Mise à jour d'un employé--------------------
//   const handleUpdateEmployee = (id) => {
//     const updatedEmployee = {
//       lastname: 'Tara',
//       firstname: 'Dave',
//       phone: '0909090909',
//     };

//     updateEmployee(id, updatedEmployee).then(() => {
//       getAllEmployees().then((data) => {
//         setEmployees(data.data);
//       });
//     });
//   };
//   // --------------------------------------------

//   //Suppression d'un employé----------------------
//   const handleDeleteEmployee = (id) => {
//     deleteEmployee(id).then(() => {
//       getAllEmployees().then((data) => {
//         setEmployees(data.data);
//       });
//     });
//   };
//   // ---------------------------------------------

//   return (
//     <div className="dashboard">
//       <h1>Tableau de bord de gestion des employés</h1>
//       <table id="employee-table">
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Prénom</th>
//             <th>Numéro</th>
//             <th>Id</th>
//             <th> Modification </th>
//             <th> Suppression </th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((item) => {
//             return (
//               <tr key={item.id}>
//                 <td>{item.lastname}</td>
//                 <td>{item.firstname}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.id}</td>
//                 <td>
//                   <button
//                     onClick={() => {
//                       handleUpdateEmployee(item.id);
//                       console.log('update!');
//                     }}
//                   >
//                     Modifier
//                   </button>
//                 </td>
//                 <td>
//                   <button onClick={() => handleDeleteEmployee(item.id)}>
//                     Supprimer
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <button
//         id="add-employee"
//         onClick={() => {
//           handleAddEmployee();
//           console.log('create!');
//         }}
//       >
//         Ajouter un employé
//       </button>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';
import { addEmployee } from 'renderer/utils/api-call/addEmployee';
import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';
import { deleteEmployee } from 'renderer/utils/api-call/deleteEmployee';
import { Button } from '@mui/material';

export default function SizeDemo() {
  const [employees, setEmployees] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (reload) {
      setReload(false);
    }
    getAllEmployees().then((data) => {
      setEmployees(data.data);
    });
  }, [reload]);

  // Fonction pour gérer la création d'un nouvel employé
  const handleCreateEmployee = () => {
    const newEmployee = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'toto@gmail.com',
      phone: '0606060606',
      id_roles: 1,
    };
    addEmployee(newEmployee).finally(() => {
      setReload(true);
    });
    console.log('Créer un nouvel employé');
  };
  // ------------------------------------------------------

  // Fonction pour modifier un employé en fonction de son ID
  const handleEditEmployee = (id) => {
    // Trouver l'employé correspondant à l'ID dans le tableau 'employees'
    const employeeToUpdate = employees.find((employee) => employee.id === id);

    if (!employeeToUpdate) {
      console.error(`Employé avec l'ID ${id} introuvable.`);
      return;
    }

    // Mettre à jour les informations de l'employé
    const updatedEmployee = {
      ...employeeToUpdate,
      lastname: 'Tara',
      firstname: 'Dave',
      email: 'dave.tara@gmail.com',
      phone: '0909090909',
      id_roles: 1,
    };

    // Appeler l'API pour mettre à jour l'employé
    updateEmployee(id, updatedEmployee).finally(() => {
      setReload(true);
    });

    console.log(`Modifier l'employé avec l'ID : ${id}`);
  };
  // ------------------------------------------------------

  // Fonction pour supprimer un employé en fonction de son ID
  const handleDeleteEmployee = (id) => {
    deleteEmployee(id).then(() => {
      getAllEmployees().then((data) => {
        setEmployees(data.data);
      });
    });
    console.log(`Supprimer l'employé avec l'ID : ${id}`);
  };
  // ------------------------------------------------------

  // Template pour le bouton de modification
  const editButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        rounded={true}
        aria-label="Modifier"
        onClick={() => handleEditEmployee(rowData.id)}
      />
    );
  };
  // ------------------------------------------------------

  // Template pour le bouton de suppression
  const deleteButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-times"
        rounded={true}
        severity="danger"
        aria-label="Supprimer"
        onClick={() => handleDeleteEmployee(rowData.id)}
      />
    );
  };
  // ------------------------------------------------------

  return (
    <div className="card">
      <DataTable value={employees} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id"></Column>
        <Column field="lastname" header="Nom"></Column>
        <Column field="firstname" header="Prénom"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Téléphone"></Column>
        <Column header="Modifier" body={editButtonTemplate}></Column>
        <Column header="Supprimer" body={deleteButtonTemplate}></Column>
      </DataTable>
      {/* Bouton de création */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateEmployee}
      >
        Créer un nouvel employé
      </Button>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import { classNames } from 'primereact/utils';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';
// import { getAllEmployees } from '../utils/api-call/getAllEmployees';
// import { addEmployee } from '../utils/api-call/addEmployee';
// import { updateEmployee } from '../utils/api-call/updateEmployee';
// import { deleteEmployee } from '../utils/api-call/deleteEmployee';

// export default function CrudEmployee() {
//   let emptyEmployee = {
//     firstname: '',
//     lastname: '',
//     phone: '',
//   };

//   const [employees, setEmployees] = useState(null);
//   const [EmployeeDialog, setEmployeeDialog] = useState(false);
//   const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
//   const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
//   const [Employee, setEmployee] = useState(emptyEmployee);
//   const [selectedEmployees, setSelectedEmployees] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [globalFilter, setGlobalFilter] = useState(null);
//   const toast = useRef(null);
//   const dt = useRef(null);

//   const [employees, setEmployees] = useState([]);
//   useEffect(() => {
//     getAllEmployees().then((data) => {
//       setEmployees(data.data);
//     });
//   }, []);

//   const formatCurrency = (value) => {
//     return value.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     });
//   };

//   const openNew = () => {
//     setEmployee(emptyEmployee);
//     setSubmitted(false);
//     setEmployeeDialog(true);
//   };

//   const hideDialog = () => {
//     setSubmitted(false);
//     setEmployeeDialog(false);
//   };

//   const hideDeleteEmployeeDialog = () => {
//     setDeleteEmployeeDialog(false);
//   };

//   const hideDeleteEmployeesDialog = () => {
//     setDeleteEmployeesDialog(false);
//   };

//   const saveEmployee = () => {
//     setSubmitted(true);

//     if (Employee.name.trim()) {
//       let _Employees = [...Employees];
//       let _Employee = { ...Employee };

//       if (Employee.id) {
//         const index = findIndexById(Employee.id);

//         _Employees[index] = _Employee;
//         toast.current.show({
//           severity: 'success',
//           summary: 'Successful',
//           detail: 'Employee Updated',
//           life: 3000,
//         });
//       } else {
//         _Employee.id = createId();
//         _Employee.image = 'Employee-placeholder.svg';
//         _Employees.push(_Employee);
//         toast.current.show({
//           severity: 'success',
//           summary: 'Successful',
//           detail: 'Employee Created',
//           life: 3000,
//         });
//       }

//       setEmployees(_Employees);
//       setEmployeeDialog(false);
//       setEmployee(emptyEmployee);
//     }
//   };

//   const editEmployee = (Employee) => {
//     setEmployee({ ...Employee });
//     setEmployeeDialog(true);
//   };

//   const confirmDeleteEmployee = (Employee) => {
//     setEmployee(Employee);
//     setDeleteEmployeeDialog(true);
//   };

//   const deleteEmployee = () => {
//     let _Employees = Employees.filter((val) => val.id !== Employee.id);

//     setEmployees(_Employees);
//     setDeleteEmployeeDialog(false);
//     setEmployee(emptyEmployee);
//     toast.current.show({
//       severity: 'success',
//       summary: 'Successful',
//       detail: 'Employee Deleted',
//       life: 3000,
//     });
//   };

//   const findIndexById = (id) => {
//     let index = -1;

//     for (let i = 0; i < Employees.length; i++) {
//       if (Employees[i].id === id) {
//         index = i;
//         break;
//       }
//     }

//     return index;
//   };

//   const createId = () => {
//     let id = '';
//     let chars =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < 5; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     return id;
//   };

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };

//   const confirmDeleteSelected = () => {
//     setDeleteEmployeesDialog(true);
//   };

//   const deleteSelectedEmployees = () => {
//     let _Employees = Employees.filter(
//       (val) => !selectedEmployees.includes(val)
//     );

//     setEmployees(_Employees);
//     setDeleteEmployeesDialog(false);
//     setSelectedEmployees(null);
//     toast.current.show({
//       severity: 'success',
//       summary: 'Successful',
//       detail: 'Employees Deleted',
//       life: 3000,
//     });
//   };

//   const onCategoryChange = (e) => {
//     let _Employee = { ...Employee };

//     _Employee['category'] = e.value;
//     setEmployee(_Employee);
//   };

//   const onInputChange = (e, name) => {
//     const val = (e.target && e.target.value) || '';
//     let _Employee = { ...Employee };

//     _Employee[`${name}`] = val;

//     setEmployee(_Employee);
//   };

//   const onInputNumberChange = (e, name) => {
//     const val = e.value || 0;
//     let _Employee = { ...Employee };

//     _Employee[`${name}`] = val;

//     setEmployee(_Employee);
//   };

//   const leftToolbarTemplate = () => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         <Button
//           label="New"
//           icon="pi pi-plus"
//           severity="success"
//           onClick={openNew}
//         />
//         <Button
//           label="Delete"
//           icon="pi pi-trash"
//           severity="danger"
//           onClick={confirmDeleteSelected}
//           disabled={!selectedEmployees || !selectedEmployees.length}
//         />
//       </div>
//     );
//   };

//   const rightToolbarTemplate = () => {
//     return (
//       <Button
//         label="Export"
//         icon="pi pi-upload"
//         className="p-button-help"
//         onClick={exportCSV}
//       />
//     );
//   };

//   const imageBodyTemplate = (rowData) => {
//     return (
//       <img
//         src={`https://primefaces.org/cdn/primereact/images/Employee/${rowData.image}`}
//         alt={rowData.image}
//         className="shadow-2 border-round"
//         style={{ width: '64px' }}
//       />
//     );
//   };

//   const priceBodyTemplate = (rowData) => {
//     return formatCurrency(rowData.price);
//   };

//   const ratingBodyTemplate = (rowData) => {
//     return <Rating value={rowData.rating} readOnly cancel={false} />;
//   };

//   const statusBodyTemplate = (rowData) => {
//     return (
//       <Tag
//         value={rowData.inventoryStatus}
//         severity={getSeverity(rowData)}
//       ></Tag>
//     );
//   };

//   const actionBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <Button
//           icon="pi pi-pencil"
//           rounded
//           outlined
//           className="mr-2"
//           onClick={() => editEmployee(rowData)}
//         />
//         <Button
//           icon="pi pi-trash"
//           rounded
//           outlined
//           severity="danger"
//           onClick={() => confirmDeleteEmployee(rowData)}
//         />
//       </React.Fragment>
//     );
//   };

//   const getSeverity = (Employee) => {
//     switch (Employee.inventoryStatus) {
//       case 'INSTOCK':
//         return 'success';

//       case 'LOWSTOCK':
//         return 'warning';

//       case 'OUTOFSTOCK':
//         return 'danger';

//       default:
//         return null;
//     }
//   };

//   const header = (
//     <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//       <h4 className="m-0">Manage Employees</h4>
//       <span className="p-input-icon-left">
//         <i className="pi pi-search" />
//         <InputText
//           type="search"
//           onInput={(e) => setGlobalFilter(e.target.value)}
//           placeholder="Search..."
//         />
//       </span>
//     </div>
//   );
//   const EmployeeDialogFooter = (
//     <React.Fragment>
//       <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
//       <Button label="Save" icon="pi pi-check" onClick={saveEmployee} />
//     </React.Fragment>
//   );
//   const deleteEmployeeDialogFooter = (
//     <React.Fragment>
//       <Button
//         label="No"
//         icon="pi pi-times"
//         outlined
//         onClick={hideDeleteEmployeeDialog}
//       />
//       <Button
//         label="Yes"
//         icon="pi pi-check"
//         severity="danger"
//         onClick={deleteEmployee}
//       />
//     </React.Fragment>
//   );
//   const deleteEmployeesDialogFooter = (
//     <React.Fragment>
//       <Button
//         label="No"
//         icon="pi pi-times"
//         outlined
//         onClick={hideDeleteEmployeesDialog}
//       />
//       <Button
//         label="Yes"
//         icon="pi pi-check"
//         severity="danger"
//         onClick={deleteSelectedEmployees}
//       />
//     </React.Fragment>
//   );

//   return (
//     <div>
//       <Toast ref={toast} />
//       <div className="card">
//         <Toolbar
//           className="mb-4"
//           left={leftToolbarTemplate}
//           right={rightToolbarTemplate}
//         ></Toolbar>

//         <DataTable
//           ref={dt}
//           value={Employees}
//           selection={selectedEmployees}
//           onSelectionChange={(e) => setSelectedEmployees(e.value)}
//           dataKey="id"
//           paginator
//           rows={10}
//           rowsPerPageOptions={[5, 10, 25]}
//           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Employees"
//           globalFilter={globalFilter}
//           header={header}
//         >
//           <Column selectionMode="multiple" exportable={false}></Column>
//           <Column
//             field="code"
//             header="Code"
//             sortable
//             style={{ minWidth: '12rem' }}
//           ></Column>
//           <Column
//             field="name"
//             header="Name"
//             sortable
//             style={{ minWidth: '16rem' }}
//           ></Column>
//           <Column
//             field="image"
//             header="Image"
//             body={imageBodyTemplate}
//           ></Column>
//           <Column
//             field="price"
//             header="Price"
//             body={priceBodyTemplate}
//             sortable
//             style={{ minWidth: '8rem' }}
//           ></Column>
//           <Column
//             field="category"
//             header="Category"
//             sortable
//             style={{ minWidth: '10rem' }}
//           ></Column>
//           <Column
//             field="rating"
//             header="Reviews"
//             body={ratingBodyTemplate}
//             sortable
//             style={{ minWidth: '12rem' }}
//           ></Column>
//           <Column
//             field="inventoryStatus"
//             header="Status"
//             body={statusBodyTemplate}
//             sortable
//             style={{ minWidth: '12rem' }}
//           ></Column>
//           <Column
//             body={actionBodyTemplate}
//             exportable={false}
//             style={{ minWidth: '12rem' }}
//           ></Column>
//         </DataTable>
//       </div>

//       <Dialog
//         visible={EmployeeDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Employee Details"
//         modal
//         className="p-fluid"
//         footer={EmployeeDialogFooter}
//         onHide={hideDialog}
//       >
//         {Employee.image && (
//           <img
//             src={`https://primefaces.org/cdn/primereact/images/Employee/${Employee.image}`}
//             alt={Employee.image}
//             className="Employee-image block m-auto pb-3"
//           />
//         )}
//         <div className="field">
//           <label htmlFor="name" className="font-bold">
//             Name
//           </label>
//           <InputText
//             id="name"
//             value={Employee.name}
//             onChange={(e) => onInputChange(e, 'name')}
//             required
//             autoFocus
//             className={classNames({ 'p-invalid': submitted && !Employee.name })}
//           />
//           {submitted && !Employee.name && (
//             <small className="p-error">Name is required.</small>
//           )}
//         </div>
//         <div className="field">
//           <label htmlFor="description" className="font-bold">
//             Description
//           </label>
//           <InputTextarea
//             id="description"
//             value={Employee.description}
//             onChange={(e) => onInputChange(e, 'description')}
//             required
//             rows={3}
//             cols={20}
//           />
//         </div>

//         <div className="field">
//           <label className="mb-3 font-bold">Category</label>
//           <div className="formgrid grid">
//             <div className="field-radiobutton col-6">
//               <RadioButton
//                 inputId="category1"
//                 name="category"
//                 value="Accessories"
//                 onChange={onCategoryChange}
//                 checked={Employee.category === 'Accessories'}
//               />
//               <label htmlFor="category1">Accessories</label>
//             </div>
//             <div className="field-radiobutton col-6">
//               <RadioButton
//                 inputId="category2"
//                 name="category"
//                 value="Clothing"
//                 onChange={onCategoryChange}
//                 checked={Employee.category === 'Clothing'}
//               />
//               <label htmlFor="category2">Clothing</label>
//             </div>
//             <div className="field-radiobutton col-6">
//               <RadioButton
//                 inputId="category3"
//                 name="category"
//                 value="Electronics"
//                 onChange={onCategoryChange}
//                 checked={Employee.category === 'Electronics'}
//               />
//               <label htmlFor="category3">Electronics</label>
//             </div>
//             <div className="field-radiobutton col-6">
//               <RadioButton
//                 inputId="category4"
//                 name="category"
//                 value="Fitness"
//                 onChange={onCategoryChange}
//                 checked={Employee.category === 'Fitness'}
//               />
//               <label htmlFor="category4">Fitness</label>
//             </div>
//           </div>
//         </div>

//         <div className="formgrid grid">
//           <div className="field col">
//             <label htmlFor="price" className="font-bold">
//               Price
//             </label>
//             <InputNumber
//               id="price"
//               value={Employee.price}
//               onValueChange={(e) => onInputNumberChange(e, 'price')}
//               mode="currency"
//               currency="USD"
//               locale="en-US"
//             />
//           </div>
//           <div className="field col">
//             <label htmlFor="quantity" className="font-bold">
//               Quantity
//             </label>
//             <InputNumber
//               id="quantity"
//               value={Employee.quantity}
//               onValueChange={(e) => onInputNumberChange(e, 'quantity')}
//             />
//           </div>
//         </div>
//       </Dialog>

//       <Dialog
//         visible={deleteEmployeeDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Confirm"
//         modal
//         footer={deleteEmployeeDialogFooter}
//         onHide={hideDeleteEmployeeDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: '2rem' }}
//           />
//           {Employee && (
//             <span>
//               Are you sure you want to delete <b>{Employee.name}</b>?
//             </span>
//           )}
//         </div>
//       </Dialog>

//       <Dialog
//         visible={deleteEmployeesDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Confirm"
//         modal
//         footer={deleteEmployeesDialogFooter}
//         onHide={hideDeleteEmployeesDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: '2rem' }}
//           />
//           {Employee && (
//             <span>Are you sure you want to delete the selected Employees?</span>
//           )}
//         </div>
//       </Dialog>
//     </div>
//   );
// }
