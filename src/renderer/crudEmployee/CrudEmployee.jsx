// import React, { useState, useEffect, useRef } from 'react';
// import './CrudEmployee.css';
// import { DataTable } from 'primereact/datatable';
// import { classNames } from 'primereact/utils';
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
// import { Badge } from 'primereact/badge';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';
// import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';
// import { createEmployee } from 'renderer/utils/api-call/createEmployee';
// import { Box, InputAdornment, TextField, Typography } from '@mui/material';
// import { deletedEmployee } from 'renderer/utils/api-call/deleteEmployee';

// const CrudEmployee = () => {
//   const emptyEmployee = {
//     lastname: '',
//     firstname: '',
//     email: '',
//     phone: '',
//     id_roles: '',
//   };

//   const [employees, setEmployees] = useState([]);
//   const [employeeDialog, setEmployeeDialog] = useState(false);
//   const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [employee, setEmployee] = useState(emptyEmployee);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const toast = useRef(null);
//   const dt = useRef(null);
//   const [isLoad, setIsLoad] = useState(false);

//   useEffect(() => {
//     getAllEmployees()
//       .then((res) => {
//         if (res.data) {
//           console.log(res.data);
//           setEmployees(res.data);
//         }
//       })
//       .finally(() => {
//         setIsLoad(true);
//       });
//   }, [isLoad]);

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Le libellé est obligatoire'),
//     purchasePrice: Yup.number()
//       .positive('Le prix ne peut être inférieur à 0€')
//       .required('Le prix est obligatoire'),
//   });

//   const formatCurrency = (value) => {
//     return value.toLocaleString('fr-FR', {
//       style: 'currency',
//       currency: 'EUR',
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

//   const saveEmployee = (values, id) => {
//     const _employee = { ...values };
//     if (id) {
//       updateEmployee(id, _employee)
//         .then((res) => {
//           if (res.data.message === 'Mis à jour') {
//             toast.current.show({
//               severity: 'success',
//               summary: 'Successful',
//               detail: "L'employé a été mis à jour",
//               life: 3000,
//             });
//             setEmployeeDialog(false);
//             setIsLoad(false);
//           }
//         })
//         .catch((error) => {
//           toast.current.show({
//             severity: 'danger',
//             summary: 'Error',
//             detail: "L'employé n'a pas été mis à jour",
//             life: 3000,
//           });
//         });
//     } else {
//       createEmployee(_employee)
//         .then((res) => {
//           if (res.data.message === 'created') {
//             toast.current.show({
//               severity: 'success',
//               summary: 'Successful',
//               detail: "L'employé a bien été ajouté",
//               life: 3000,
//             });
//             setEmployeeDialog(false);
//             setIsLoad(false);
//           }
//         })
//         .catch((error) => {
//           toast.current.show({
//             severity: 'danger',
//             summary: 'Error',
//             detail: "L'employé n'a pas été ajouté",
//             life: 3000,
//           });
//         });
//     }
//   };

//   const editEmployee = (employee) => {
//     setEmployee({ ...employee });
//     setEmployeeDialog(true);
//   };

//   const confirmDeleteEmployee = (employee) => {
//     setEmployee(employee);
//     setDeleteEmployeeDialog(true);
//   };

//   const deleteEmployee = (id) => {
//     deletedEmployee(id)
//       .then((res) => {
//         if (res.status === 200) {
//           const _employees = employees.filter(
//             (item) => item.id !== employee.id
//           );
//           setEmployees(_employees);
//           setDeleteEmployeeDialog(false);
//           toast.current.show({
//             severity: 'success',
//             summary: 'Successful',
//             detail: "L'employé a été supprimé",
//             life: 3000,
//           });
//         }
//       })
//       .catch(() => {
//         toast.current.show({
//           severity: 'danger',
//           summary: 'Error',
//           detail: "L'employé n'a pas été supprimé",
//           life: 3000,
//         });
//       });
//   };

//   const findIndexById = (id) => {
//     let index = -1;

//     for (let i = 0; i < employees.length; i++) {
//       if (employees[i].id === id) {
//         index = i;
//         break;
//       }
//     }

//     return index;
//   };

//   const exportCSV = () => {
//     dt.current.exportCSV();
//   };

//   const confirmDeleteSelected = () => {
//     setDeleteEmployeesDialog(true);
//   };

//   const deleteSelectedEmployees = () => {
//     // Créez un tableau de promesses pour chaque suppression d'ingrédient
//     const deletePromises = selectedEmployees.map((selectedEmployee) =>
//       deleteEmployeeById(selectedIngredient.id)
//     );

//     // Exécutez toutes les suppressions en parallèle
//     Promise.all(deletePromises)
//       .then((responses) => {
//         // Vérifiez si toutes les suppressions sont réussies (statut 200)
//         const allDeleted = responses.every((res) => res.status === 200);

//         if (allDeleted) {
//           // Filtrer les ingrédients pour supprimer ceux qui ont été sélectionnés
//           const _employees = employees.filter(
//             (item) => !selectedEmployees.includes(item)
//           );
//           setEmployees(_employees);
//           setDeleteEmployeeDialog(false);
//           setSelectedEmployee(null); // Réinitialisez la sélection
//           toast.current.show({
//             severity: 'success',
//             summary: 'Successful',
//             detail: 'Employé(s) supprimé(s)',
//             life: 3000,
//           });
//         } else {
//           // Gérer les cas où certaines suppressions ont échoué
//           toast.current.show({
//             severity: 'danger',
//             summary: 'Error',
//             detail: 'Impossible de supprimer le/les employé(s)',
//             life: 3000,
//           });
//         }
//       })
//       .catch(() => {
//         // Gérer les erreurs d'API
//         toast.current.show({
//           severity: 'danger',
//           summary: 'Error',
//           detail: 'Impossible de supprimer le/les employé(s)',
//           life: 3000,
//         });
//       });
//   };

//   const leftToolbarTemplate = () => {
//     return (
//       <div className="flex flex-wrap gap-2">
//         <Button
//           style={{
//             marginRight: '6px',
//             backgroundColor: '#4f7170',
//             border: '1px solid #4f7170',
//           }}
//           label="Ajouter"
//           icon="pi pi-plus"
//           onClick={openNew}
//         />
//         <Button
//           label="Supprimer"
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
//         style={{ backgroundColor: '#00656f', border: '1px solid #00656f' }}
//         icon="pi pi-upload"
//         className="p-button-help"
//         onClick={exportCSV}
//       />
//     );
//   };

//   const firstnameBodyTemplate = (rowData) => {
//     return <Typography variant="BUTTON TEXT">{rowData.firstname}</Typography>;
//   };

//   const lastnameBodyTemplate = (rowData) => {
//     return <Typography variant="BUTTON TEXT">{rowData.lastname}</Typography>;
//   };

//   const emailBodyTemplate = (rowData) => {
//     return <Typography variant="BUTTON TEXT">{rowData.email}</Typography>;
//   };

//   const phoneBodyTemplate = (rowData) => {
//     return <Typography variant="BUTTON TEXT">{rowData.phone}</Typography>;
//   };

//   const roleBodyTemplate = (rowData) => {
//     return <Typography variant="BUTTON TEXT">{rowData.roles.name}</Typography>;
//   };

//   const actionBodyTemplate = (rowData) => {
//     return (
//       <React.Fragment>
//         <Button
//           icon="pi pi-pencil"
//           style={{ color: '#212830', marginRight: '6px' }}
//           rounded
//           outlined
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

//   const header = (
//     <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
//       <h4 style={{ color: '#212830' }} className="m-0">
//         Gestion des employés
//       </h4>
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
//           scrollable
//           scrollHeight="50vh"
//           ref={dt}
//           value={employees}
//           selection={selectedEmployees}
//           onSelectionChange={(e) => setSelectedEmployees(e.value)}
//           dataKey="id"
//           paginator
//           rows={10}
//           rowsPerPageOptions={[5, 10, 25]}
//           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//           currentPageReportTemplate="Afficher {first} à {last} sur {totalRecords} employés"
//           globalFilter={globalFilter}
//           header={header}
//         >
//           <Column selectionMode="multiple" exportable={false}></Column>
//           <Column
//             field="firstname"
//             header="Prénom"
//             body={firstnameBodyTemplate}
//             sortable
//             style={{ minWidth: '12rem' }}
//           ></Column>
//           <Column
//             field="name"
//             header="Nom"
//             body={lastnameBodyTemplate}
//             sortable
//             style={{ minWidth: '16rem' }}
//           ></Column>
//           <Column
//             field="email"
//             header="Email"
//             body={emailBodyTemplate}
//             sortable
//             style={{ minWidth: '16rem' }}
//           ></Column>
//           <Column
//             field="phone"
//             header="Numéro"
//             body={phoneBodyTemplate}
//             sortable
//             style={{ minWidth: '16rem' }}
//           ></Column>
//           <Column
//             field="role"
//             header="Rôle"
//             body={roleBodyTemplate}
//             sortable
//             style={{ minWidth: '16rem' }}
//           ></Column>
//           <Column
//             body={actionBodyTemplate}
//             exportable={false}
//             style={{ minWidth: '12rem' }}
//           ></Column>
//         </DataTable>
//       </div>

//       {/* Modal details et modif */}
//       <Dialog
//         visible={employeeDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Détails de l'employé"
//         modal
//         className="p-fluid"
//         onHide={hideDialog}
//       >
//         <Formik
//           initialValues={{
//             id_roles: employee.id_roles,
//             firstname: employee.firstname,
//             lastname: employee.lastname,
//             email: employee.email,
//             phone: employee.phone,
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             saveEmployee(values, employee.id);
//           }}
//         >
//           {({
//             values,
//             handleChange,
//             handleSubmit,
//             errors,
//             touched,
//             isSubmitting,
//           }) => {
//             return (
//               <Form>
//                 <TextField
//                   value={values.name}
//                   onChange={handleChange}
//                   label="Libellé"
//                   id="name"
//                   name="name"
//                   type="text"
//                   sx={{ m: 1, width: '100%' }}
//                 />
//                 <ErrorMessage name="name" />

//                 <TextField
//                   value={values.purchasePrice}
//                   onChange={handleChange}
//                   label="Prix"
//                   id="purchasePrice"
//                   name="purchasePrice"
//                   type="number"
//                   sx={{ m: 1, width: '100%' }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">€</InputAdornment>
//                     ),
//                     inputProps: { min: 0 },
//                   }}
//                 />
//                 <ErrorMessage name="purchasePrice" />
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '10px',
//                   }}
//                 >
//                   <Button
//                     style={{
//                       marginRight: '10px',
//                       color: '#4f7170',
//                       border: '1px solid #4f7170',
//                     }}
//                     label="Annuler"
//                     icon="pi pi-times"
//                     outlined
//                     onClick={hideDialog}
//                   />
//                   <Button
//                     style={{
//                       backgroundColor: '#4f7170',
//                       border: '1px solid #4f7170',
//                     }}
//                     label="Sauvegarder"
//                     type="submit"
//                     icon="pi pi-check"
//                     onClick={handleSubmit}
//                   />
//                 </Box>
//               </Form>
//             );
//           }}
//         </Formik>
//       </Dialog>

//       {/* Modal delete employee */}
//       <Dialog
//         visible={deleteEmployeesDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Valider"
//         modal
//         onHide={hideDeleteEmployeeDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: '2rem' }}
//           />
//           {employee && (
//             <span>
//               {' '}
//               Êtes-vous sûr de vouloir supprimer <b>{employee.name}</b>?
//             </span>
//           )}
//         </div>
//         <Box
//           sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
//         >
//           <Button
//             style={{
//               marginRight: '10px',
//               color: '#4f7170',
//               border: '1px solid #4f7170',
//             }}
//             label="Non"
//             icon="pi pi-times"
//             outlined
//             onClick={hideDeleteEmployeeDialog}
//           />
//           <Button
//             label="Oui"
//             icon="pi pi-check"
//             severity="danger"
//             onClick={() => deleteEmployee(employee.id)}
//           />
//         </Box>
//       </Dialog>

//       {/* Modal delete selection employee */}
//       <Dialog
//         visible={deleteEmployeesDialog}
//         style={{ width: '32rem' }}
//         breakpoints={{ '960px': '75vw', '641px': '90vw' }}
//         header="Valider"
//         modal
//         onHide={hideDeleteEmployeesDialog}
//       >
//         <div className="confirmation-content">
//           <i
//             className="pi pi-exclamation-triangle mr-3"
//             style={{ fontSize: '2rem' }}
//           />
//           {employee && (
//             <span> Êtes-vous sûr de vouloir supprimer l'employé ?</span>
//           )}
//         </div>
//         <Box
//           sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
//         >
//           <Button
//             style={{
//               marginRight: '10px',
//               color: '#4f7170',
//               border: '1px solid #4f7170',
//             }}
//             label="Non"
//             icon="pi pi-times"
//             outlined
//             onClick={hideDeleteEmployeesDialog}
//           />
//           <Button
//             label="Oui"
//             icon="pi pi-check"
//             severity="danger"
//             onClick={deleteSelectedEmployees}
//           />
//         </Box>
//       </Dialog>
//     </div>
//   );
// };

// export default CrudEmployee;

import React, { useState, useEffect, useRef } from 'react';
import './CrudEmployee.css';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAllEmployees } from 'renderer/utils/api-call/getAllEmployees';
import { updateEmployee } from 'renderer/utils/api-call/updateEmployee';
import { createEmployee } from 'renderer/utils/api-call/createEmployee';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { deletedEmployee } from 'renderer/utils/api-call/deleteEmployee';

const CrudEmployee = () => {
  const emptyEmployee = {
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
    id_roles: '',
  };

  // ... (other state variables and useEffect)

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Le prénom est obligatoire'),
    lastname: Yup.string().required('Le nom est obligatoire'),
    // ... (other validation fields)
  });

  // ... (other methods and components)

  const findIndexById = (id) => {
    let index = -1;
    employees.forEach((employee, i) => {
      // Fixed: Use 'i' as the index
      if (employees[i].id === id) {
        index = i;
      }
    });
    return index;
  };

  // ... (other methods and components)

  const [employees, setEmployees] = useState([]);
  const [employeeDialog, setEmployeeDialog] = useState(false);
  const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [employee, setEmployee] = useState(emptyEmployee);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef(null);
  const dt = useRef(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    getAllEmployees()
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setEmployees(res.data);
        }
      })
      .finally(() => {
        setIsLoad(true);
      });
  }, [isLoad]);

  const formatCurrency = (value) => {
    return value.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
  };

  const openNew = () => {
    setEmployee(emptyEmployee);
    setSubmitted(false);
    setEmployeeDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEmployeeDialog(false);
  };

  const hideDeleteEmployeeDialog = () => {
    setDeleteEmployeeDialog(false);
  };

  const hideDeleteEmployeesDialog = () => {
    setDeleteEmployeesDialog(false);
  };

  const saveEmployee = (values, id) => {
    const _employee = { ...values };
    if (id) {
      updateEmployee(id, _employee)
        .then((res) => {
          if (res.data?.message === 'Mis à jour') {
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: "L'employé a été mis à jour",
              life: 3000,
            });
            setEmployeeDialog(false);
            setIsLoad(false);
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: "L'employé n'a pas été mis à jour",
            life: 3000,
          });
        });
    } else {
      createEmployee(_employee)
        .then((res) => {
          if (res.data?.message === 'created') {
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: "L'employé a bien été ajouté",
              life: 3000,
            });
            setEmployeeDialog(false);
            setIsLoad(false);
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: "L'employé n'a pas été ajouté",
            life: 3000,
          });
        });
    }
  };

  const editEmployee = (employee) => {
    setEmployee({ ...employee });
    setEmployeeDialog(true);
  };

  const confirmDeleteEmployee = (employee) => {
    setEmployee(employee);
    setDeleteEmployeesDialog(true);
  };

  const deleteEmployee = (id) => {
    console.log(id);
    deletedEmployee(id)
      .then((res) => {
        if (res.status === 200) {
          const _employees = employees.filter(
            (item) => item.id !== employee.id
          );
          setEmployees(_employees);
          setDeleteEmployeesDialog(false);
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: "L'employé a été supprimé",
            life: 3000,
          });
        }
      })
      .catch(() => {
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: "L'employé n'a pas été supprimé",
          life: 3000,
        });
      });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteEmployeesDialog(true);
  };

  const deleteSelectedEmployees = () => {
    // Créez un tableau de promesses pour chaque suppression d'ingrédient
    const deletePromises = selectedEmployees.map((selectedEmployee) =>
      deleteEmployee(selectedEmployee.id)
    );

    // Exécutez toutes les suppressions en parallèle
    Promise.all(deletePromises)
      .then((responses) => {
        // Vérifiez si toutes les suppressions sont réussies (statut 200)
        const allDeleted = responses.every((res) => res.status === 200);

        if (allDeleted) {
          // Filtrer les ingrédients pour supprimer ceux qui ont été sélectionnés
          const _employees = employees.filter(
            (item) => !selectedEmployees.includes(item)
          );
          setEmployees(_employees);
          setDeleteEmployeeDialog(false);
          setSelectedEmployee(null); // Réinitialisez la sélection
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Employé(s) supprimé(s)',
            life: 3000,
          });
        } else {
          // Gérer les cas où certaines suppressions ont échoué
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: 'Impossible de supprimer le/les employé(s)',
            life: 3000,
          });
        }
      })
      .catch(() => {
        // Gérer les erreurs d'API
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: 'Impossible de supprimer le/les employé(s)',
          life: 3000,
        });
      });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          style={{
            marginRight: '6px',
            backgroundColor: '#4f7170',
            border: '1px solid #4f7170',
          }}
          label="Ajouter"
          icon="pi pi-plus"
          onClick={openNew}
        />
        <Button
          label="Supprimer"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedEmployees || !selectedEmployees.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        style={{ backgroundColor: '#00656f', border: '1px solid #00656f' }}
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const firstnameBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.firstname}</Typography>;
  };

  const lastnameBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.lastname}</Typography>;
  };

  const emailBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.email}</Typography>;
  };

  const phoneBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.phone}</Typography>;
  };

  const roleBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.roles.name}</Typography>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          style={{ color: '#212830', marginRight: '6px' }}
          rounded
          outlined
          onClick={() => editEmployee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteEmployee(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 style={{ color: '#212830' }} className="m-0">
        Gestion des employés
      </h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          scrollable
          scrollHeight="50vh"
          ref={dt}
          value={employees}
          selection={selectedEmployees}
          onSelectionChange={(e) => setSelectedEmployees(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Afficher {first} à {last} sur {totalRecords} employés"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="firstname"
            header="Prénom"
            body={firstnameBodyTemplate}
            sortable
            style={{ minWidth: '12rem' }}
          ></Column>
          <Column
            field="name"
            header="Nom"
            body={lastnameBodyTemplate}
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field="email"
            header="Email"
            body={emailBodyTemplate}
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field="phone"
            header="Numéro"
            body={phoneBodyTemplate}
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field="role"
            header="Rôle"
            body={roleBodyTemplate}
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>

      {/* Modal details et modif */}
      <Dialog
        visible={employeeDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Détails de l'employé"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <Formik
          initialValues={{
            id_roles: employee.id_roles,
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            phone: employee.phone,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveEmployee(values, employee.id);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
          }) => {
            return (
              <Form>
                <TextField
                  value={values.name}
                  onChange={handleChange}
                  label="Libellé"
                  id="name"
                  name="name"
                  type="text"
                  sx={{ m: 1, width: '100%' }}
                />
                <ErrorMessage name="name" />

                <TextField
                  value={values.purchasePrice}
                  onChange={handleChange}
                  label="Prix"
                  id="purchasePrice"
                  name="purchasePrice"
                  type="number"
                  sx={{ m: 1, width: '100%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">€</InputAdornment>
                    ),
                    inputProps: { min: 0 },
                  }}
                />
                <ErrorMessage name="purchasePrice" />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                  }}
                >
                  <Button
                    style={{
                      marginRight: '10px',
                      color: '#4f7170',
                      border: '1px solid #4f7170',
                    }}
                    label="Annuler"
                    icon="pi pi-times"
                    outlined
                    onClick={hideDialog}
                  />
                  <Button
                    style={{
                      backgroundColor: '#4f7170',
                      border: '1px solid #4f7170',
                    }}
                    label="Sauvegarder"
                    type="submit"
                    icon="pi pi-check"
                    onClick={handleSubmit}
                  />
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Dialog>

      {/* Modal delete employee */}
      <Dialog
        visible={deleteEmployeesDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Valider"
        modal
        onHide={hideDeleteEmployeeDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {employee && (
            <span>
              {' '}
              Êtes-vous sûr de vouloir supprimer <b>{employee.name}</b>?
            </span>
          )}
        </div>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <Button
            style={{
              marginRight: '10px',
              color: '#4f7170',
              border: '1px solid #4f7170',
            }}
            label="Non"
            icon="pi pi-times"
            outlined
            onClick={hideDeleteEmployeeDialog}
          />
          <Button
            label="Oui"
            icon="pi pi-check"
            severity="danger"
            onClick={() => deleteEmployee(employee.id)}
          />
        </Box>
      </Dialog>

      {/* Modal delete selection employee */}
      <Dialog
        visible={deleteEmployeesDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Valider"
        modal
        onHide={hideDeleteEmployeesDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {employee && (
            <span> Êtes-vous sûr de vouloir supprimer l'employé ?</span>
          )}
        </div>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <Button
            style={{
              marginRight: '10px',
              color: '#4f7170',
              border: '1px solid #4f7170',
            }}
            label="Non"
            icon="pi pi-times"
            outlined
            onClick={hideDeleteEmployeesDialog}
          />
          <Button
            label="Oui"
            icon="pi pi-check"
            severity="danger"
            onClick={deleteSelectedEmployees}
          />
        </Box>
      </Dialog>
    </div>
  );
};

export default CrudEmployee;
