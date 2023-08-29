import React, { useState, useEffect, useRef } from 'react';
import './crudIngredient.css'
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
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
import { getAllIngredients } from 'renderer/utils/api-call/getAllIngredients';
import { Box, InputAdornment,TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import { updatedIngredientById } from 'renderer/utils/api-call/updatedIngredientById';
import { createdIngredient } from 'renderer/utils/api-call/createdIngredient';
import { deleteIngredientById } from 'renderer/utils/api-call/deleteIngredient';
import { getStockByFranchise } from 'renderer/utils/api-call/getStockByFranchise';

const CrudIngredient = () => {
  const emptyIngredients = {
    name: '',
    purchasePrice: '',
  };

const [ingredients, setIngredients] = useState(null);
const [ingredientDialog, setIngredientDialog] = useState(false);
const [deleteIngredientDialog, setDeleteIngredientDialog] = useState(false);
const [deleteIngredientsDialog, setDeleteIngredientsDialog] = useState(false);
const [ingredient, setIngredient] = useState(emptyIngredients);
const [selectedIngredients, setSelectedIngredients] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);
const [isLoad, setIsLoad] = useState(false);

useEffect(()=>{
  getAllIngredients()
  .then((res)=>{
    if (res.data) {
      setIngredients(res.data);
    }
  }).finally(()=>{
    setIsLoad(true)
  })
}, [isLoad])

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le libellé est obligatoire"),
  purchasePrice: Yup.number()
    .positive("Le prix ne peut être inférieur à 0€")
    .required("Le prix est obligatoire"),
});

const formatCurrency = (value) => {
    return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
};

const openNew = () => {
    setIngredient(emptyIngredients);
    setSubmitted(false);
    setIngredientDialog(true);
};

const hideDialog = () => {
    setSubmitted(false);
    setIngredientDialog(false);
};

const hideDeleteIngredientDialog = () => {
    setDeleteIngredientDialog(false);
};

const hideDeleteIngredientsDialog = () => {
    setDeleteIngredientsDialog(false);
};

const saveIngredient = (values,id) => {
    const _ingredient = { ...values };
    if (id) {
    updatedIngredientById(_ingredient, id)
    .then((res)=>{
      if (res.data.message === 'Mis à jour') {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'L\'ingredient a été mis à jour',
          life: 3000
        });
        setIngredientDialog(false);
        setIsLoad(false)
      }
    }).catch((error) => {
      toast.current.show({
        severity: 'danger',
        summary: 'Error',
        detail: 'L\'ingredient n\'a pas été mis à jour',
        life: 3000
      });
      });
  } else {
    createdIngredient(_ingredient)
    .then((res)=>{
      if (res.data.message === 'created') {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'L\ingredient a bien été ajouté',
          life: 3000
        });
        setIngredientDialog(false);
        setIsLoad(false)
      }
    }).catch((error) => {
      toast.current.show({
        severity: 'danger',
        summary: 'Error',
        detail: 'L\'ingredient n\'a pas été ajouté',
        life: 3000
      });
      });
  }
};

const editIngredient = (ingredient) => {
    setIngredient({ ...ingredient });
    setIngredientDialog(true);
};

const confirmDeleteIngredient = (ingredient) => {
    setIngredient(ingredient);
    setDeleteIngredientDialog(true);
};

const deleteIngredient = (id) => {
    deleteIngredientById(id)
    .then((res)=>{
      if (res.status === 200) {
        const _ingredients = ingredients.filter((item) => item.id !== ingredient.id);
        setIngredients(_ingredients);
        setDeleteIngredientDialog(false);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'L\'ingredient a été supprimé',
          life: 3000
        });
      }
    }).catch(()=>{
      toast.current.show({
        severity: 'danger',
        summary: 'Error',
        detail: 'L\'ingredient n\'a pas été supprimé',
        life: 3000
      });
    })
};

const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

const exportCSV = () => {
    dt.current.exportCSV();
};

const confirmDeleteSelected = () => {
    setDeleteIngredientsDialog(true);
};

const deleteSelectedIngredients = () => {
  // Créez un tableau de promesses pour chaque suppression d'ingrédient
  const deletePromises = selectedIngredients.map((selectedIngredient) =>
    deleteIngredientById(selectedIngredient.id)
  );

  // Exécutez toutes les suppressions en parallèle
  Promise.all(deletePromises)
    .then((responses) => {
      // Vérifiez si toutes les suppressions sont réussies (statut 200)
      const allDeleted = responses.every((res) => res.status === 200);

      if (allDeleted) {
        // Filtrer les ingrédients pour supprimer ceux qui ont été sélectionnés
        const _ingredients = ingredients.filter(
          (item) => !selectedIngredients.includes(item)
        );
        setIngredients(_ingredients);
        setDeleteIngredientsDialog(false);
        setSelectedIngredients(null); // Réinitialisez la sélection
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Ingredient(s) supprimé(s)',
          life: 3000
        });
      } else {
        // Gérer les cas où certaines suppressions ont échoué
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: 'Impossible de supprimer la/les sélection(s)',
          life: 3000
        });
      }
    })
    .catch(() => {
      // Gérer les erreurs d'API
      toast.current.show({
        severity: 'danger',
        summary: 'Error',
        detail: 'Impossible de supprimer la/les sélection(s)',
        life: 3000
      });
    });
};

const leftToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button style={{marginRight: '6px', backgroundColor: '#4f7170', border: '1px solid #4f7170'}} label="Ajouter" icon="pi pi-plus" onClick={openNew} />
            <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedIngredients || !selectedIngredients.length} />
        </div>
    );
};

const rightToolbarTemplate = () => {
    return <Button label="Export" style={{backgroundColor: '#00656f', border: '1px solid #00656f'}} icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const codeBodyTemplate = (rowData) => {
  return <Typography variant='BUTTON TEXT'>{rowData.id}</Typography>;
};

const labelBodyTemplate = (rowData) => {
  return <Typography variant='BUTTON TEXT'>{rowData.name}</Typography>;
};

const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.purchasePrice);
};

// const quantityBodyTemplate = (rowData) => {
//   if (rowData.quantity > 100) {
//     return <Badge value={rowData.quantity} severity="success"></Badge>;
// } else if (rowData.quantity > 0 && rowData.quantity < 100) {
//     return <Badge value={rowData.quantity} severity="warning"></Badge>;
// } else {
//     return <Badge value={rowData.quantity} severity="danger"></Badge>;
// }
// };

// const statusBodyTemplate = (rowData) => {
//   if (rowData.quantity > 100) {
//     return <Tag value="En Stock" icon="pi pi-check" severity="success"></Tag>;
//   } else if (rowData.quantity > 0 && rowData.quantity < 100) {
//     return <Tag value="Stock bas" icon="pi pi-exclamation-triangle" severity="warning"></Tag>;
//   } else {
//     return <Tag value="Stock épuisé" icon="pi pi-times" severity="danger"></Tag>;
//   }
// };

const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" style={{color: '#212830', marginRight: '6px'}} rounded outlined onClick={() => editIngredient(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteIngredient(rowData)} />
        </React.Fragment>
    );
};

const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 style={{color: '#212830'}} className="m-0">Gestion des ingrédients</h4>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);


return (
    <div>
        <Toast ref={toast} />
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable scrollable scrollHeight='50vh' ref={dt} value={ingredients} selection={selectedIngredients} onSelectionChange={(e) => setSelectedIngredients(e.value)}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Afficher {first} à {last} sur {totalRecords} ingrédients" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="code" header="Code" body={codeBodyTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="name" header="Libelle" body={labelBodyTemplate} sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="purchasePrice" header="Prix" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                {/* <Column field="quantity" header="Quantité" body={quantityBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>

      {/* Modal details et modif */}
        <Dialog visible={ingredientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Détails de l'ingredient" modal className="p-fluid" onHide={hideDialog}>
          <Formik
            initialValues={{
              name: ingredient.name,
              purchasePrice: ingredient.purchasePrice,
            }}
            validationSchema={validationSchema}
            onSubmit={(values)=>{
              saveIngredient(values, ingredient.id)
            }}
          >
            {({ values, handleChange,handleSubmit, errors, touched, isSubmitting }) => {
              return (
                <Form>
                  <TextField
                    value={values.name} 
                    onChange={handleChange}
                    label="Libellé"
                    id="name"
                    name='name'
                    type='text'
                    sx={{ m: 1, width: "100%" }}
                  />
                  <ErrorMessage name="name" />

                  <TextField
                    value={values.purchasePrice} 
                    onChange={handleChange}
                    label="Prix"
                    id="purchasePrice"
                    name='purchasePrice'
                    type='number'
                    sx={{ m: 1, width: "100%" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">€</InputAdornment>,
                      inputProps: { min: 0 }
                    }}
                  />
                  <ErrorMessage name="purchasePrice" />
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                  <Button style={{marginRight: '10px', color: '#4f7170', border: '1px solid #4f7170'}} label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
                  <Button style={{backgroundColor: '#4f7170', border: '1px solid #4f7170'}} label="Sauvegarder" type='submit' icon="pi pi-check" onClick={handleSubmit}/>
                </Box>

                </Form>
              );
            }}
          </Formik>
        </Dialog>

        {/* Modal delete ingredient */}
        <Dialog visible={deleteIngredientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Valider" modal onHide={hideDeleteIngredientDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {ingredient && (
                    <span> Êtes-vous sûr de vouloir supprimer <b>{ingredient.name}</b>?</span>
                )}
            </div>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
              <Button style={{marginRight: '10px', color: '#4f7170', border: '1px solid #4f7170'}} label="Non" icon="pi pi-times" outlined onClick={hideDeleteIngredientDialog} />
              <Button label="Oui" icon="pi pi-check" severity="danger" onClick={() => deleteIngredient(ingredient.id)}/>
            </Box>
        </Dialog>
        
        {/* Modal delete selection ingredient */}
        <Dialog visible={deleteIngredientsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Valider" modal onHide={hideDeleteIngredientsDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {ingredient && <span> Êtes-vous sûr de vouloir supprimer l'ingredient ?</span>}
            </div>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
              <Button style={{marginRight: '10px', color: '#4f7170', border: '1px solid #4f7170'}} label="Non" icon="pi pi-times" outlined onClick={hideDeleteIngredientsDialog} />
              <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedIngredients} />
            </Box>
        </Dialog>
    </div>
);
}

export default CrudIngredient