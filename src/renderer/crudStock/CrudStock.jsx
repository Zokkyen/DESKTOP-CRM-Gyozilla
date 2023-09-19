/* eslint-disable no-undef */
/* eslint-disable promise/catch-or-return */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect, useRef } from 'react';
import './crudStock.css';
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
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'primereact/dropdown';
import { getAllIngredients } from 'renderer/utils/api-call/getAllIngredients';
import { updatedIngredientById } from 'renderer/utils/api-call/updatedIngredientById';
import { createdIngredient } from 'renderer/utils/api-call/createdIngredient';
import { deleteIngredientById } from 'renderer/utils/api-call/deleteIngredient';
import { getStockByFranchise } from 'renderer/utils/api-call/getStockByFranchise';
import { deleteStockById } from 'renderer/utils/api-call/deleteStockById';
import { updateStocktById } from 'renderer/utils/api-call/updateStockById';
import { createdStock } from 'renderer/utils/api-call/createdStock';
import { UserContext } from '../utils/context/UserContext';

function CrudStock() {
  const emptyStock = {
    id_franchises: '',
    id_ingredients: '',
    quantity: '',
  };
  const [ingredients, setIngredients] = useState(null);
  const [stocks, setStocks] = useState(null);
  const [stockDialog, setStockDialog] = useState(false);
  const [deleteStockDialog, setDeleteStockDialog] = useState(false);
  const [deleteStocksDialog, setDeleteStocksDialog] = useState(false);
  const [stock, setStock] = useState(emptyStock);
  const [selectedStocks, setSelectedStocks] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [isLoad, setIsLoad] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getStockByFranchise(user.franchise)
      .then((res) => {
        if (res.data) {
          setStocks(res.data);
        }
      })
      .finally(() => {
        setIsLoad(true);
      });
  }, [isLoad, user.franchise]);

  useEffect(() => {
    getAllIngredients()
      .then((res) => {
        if (res.data) {
          setIngredients(res.data);
        }
      })
      .finally(() => {
        setIsLoad(true);
      });
  }, [isLoad]);

  const validationSchema = Yup.object().shape({
    id_ingredients: Yup.number().required("L'ingrédient est obligatoire"),
    quantity: Yup.number().required('La quantité est obligatoire'),
  });

  const openNew = () => {
    setStock(emptyStock);
    setSubmitted(false);
    setStockDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setStockDialog(false);
  };

  const hideDeleteStockDialog = () => {
    setDeleteStockDialog(false);
  };

  const hideDeleteStocksDialog = () => {
    setDeleteStocksDialog(false);
  };

  const saveStock = (values, id) => {
    const _stock = { ...values };
    if (id) {
      updateStocktById(_stock, id)
        .then((res) => {
          if (res.data.message === 'Mis à jour') {
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Le stock a été mis à jour',
              life: 3000,
            });
            setStockDialog(false);
            setIsLoad(false);
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: "Le stock n'a pas été mis à jour",
            life: 3000,
          });
        });
    } else {
      createdStock(_stock)
        .then((res) => {
          if (res.data.message === 'created') {
            toast.current.show({
              severity: 'success',
              summary: 'Successful',
              detail: "L'element a bien été ajouté",
              life: 3000,
            });
            setStockDialog(false);
            setIsLoad(false);
          }
        })
        .catch((error) => {
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: "L'element n'a pas été ajouté",
            life: 3000,
          });
        });
    }
  };

  const editStock = (stock) => {
    setStock({ ...stock });
    setStockDialog(true);
  };

  const confirmDeleteStock = (stock) => {
    setStock(stock);
    setDeleteStockDialog(true);
  };

  const deleteStock = (id) => {
    deleteStockById(id)
      .then((res) => {
        if (res.status === 200) {
          const _stocks = stocks.filter((item) => item.id !== stock.id);
          setStocks(_stocks);
          setDeleteStockDialog(false);
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: "L'element a été supprimé",
            life: 3000,
          });
        }
      })
      .catch(() => {
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: "L'element du stock n'a pas été supprimé",
          life: 3000,
        });
      });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].id === id) {
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
    setDeleteStocksDialog(true);
  };

  const deleteSelectedStocks = () => {
    // Créez un tableau de promesses pour chaque suppression d'ingrédient
    const deletePromises = selectedStocks.map((selectedStock) =>
      deleteStockById(selectedStock.id)
    );

    // Exécutez toutes les suppressions en parallèle
    Promise.all(deletePromises)
      .then((responses) => {
        // Vérifiez si toutes les suppressions sont réussies (statut 200)
        const allDeleted = responses.every((res) => res.status === 200);

        if (allDeleted) {
          // Filtrer les ingrédients pour supprimer ceux qui ont été sélectionnés
          const _stocks = stocks.filter(
            (item) => !selectedStocks.includes(item)
          );
          setStocks(_stocks);
          setDeleteStocksDialog(false);
          setSelectedStocks(null); // Réinitialisez la sélection
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Les lignes du stock ont été supprimé',
            life: 3000,
          });
        } else {
          // Gérer les cas où certaines suppressions ont échoué
          toast.current.show({
            severity: 'danger',
            summary: 'Error',
            detail: 'Impossible de supprimer la/les sélection(s)',
            life: 3000,
          });
        }
      })
      .catch(() => {
        // Gérer les erreurs d'API
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: 'Impossible de supprimer la/les sélection(s)',
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
          disabled={!selectedStocks || !selectedStocks.length}
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

  const codeBodyTemplate = (rowData) => {
    return <Typography variant="BUTTON TEXT">{rowData.id}</Typography>;
  };

  const labelBodyTemplate = (rowData) => {
    return (
      <Typography variant="BUTTON TEXT">{rowData.ingredients.name}</Typography>
    );
  };

  const quantityBodyTemplate = (rowData) => {
    return <Typography variant="OVERLINE TEXT">{rowData.quantity}</Typography>;
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.quantity > 100) {
      return <Tag value="En Stock" icon="pi pi-check" severity="success" />;
    }
    if (rowData.quantity > 0 && rowData.quantity < 100) {
      return (
        <Tag
          value="Stock bas"
          icon="pi pi-exclamation-triangle"
          severity="warning"
        />
      );
    }
    return <Tag value="Stock épuisé" icon="pi pi-times" severity="danger" />;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          style={{ color: '#212830', marginRight: '6px' }}
          rounded
          outlined
          onClick={() => editStock(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteStock(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 style={{ color: '#212830' }} className="m-0">
        Gestion du stock
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
        />
        <DataTable
          scrollable
          scrollHeight="50vh"
          ref={dt}
          value={stocks}
          selection={selectedStocks}
          onSelectionChange={(e) => setSelectedStocks(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Afficher {first} à {last} sur {totalRecords} ingrédients"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false} />
          <Column
            field="code"
            header="Code"
            body={codeBodyTemplate}
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            field="name"
            header="Libelle"
            body={labelBodyTemplate}
            sortable
            style={{ minWidth: '16rem' }}
          />
          <Column
            field="quantity"
            header="Quantité"
            body={quantityBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          />
          <Column
            field="stockStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          />
        </DataTable>
      </div>

      {/* Modal details et modif */}
      <Dialog
        visible={stockDialog}
        style={{ width: '32rem', zIndex: 9999 }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Détails du stock"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        <Formik
          initialValues={{
            id_franchises: user.franchise,
            id_ingredients: stock.id_ingredients,
            quantity: stock.quantity,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveStock(values, stock.id);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => {
            console.log(errors);
            return (
              <Form>
                <TextField
                  value={values.id_franchises}
                  id="id_franchises"
                  name="id_franchises"
                  type="hidden"
                  style={{ display: 'none' }}
                />
                <Dropdown
                  style={{ marginLeft: 9, width: '100%' }}
                  filter
                  inputId="id_ingredients"
                  name="id_ingredients"
                  value={ingredients.find(
                    (id_ingredients) =>
                      id_ingredients.id === values.id_ingredients
                  )} // Utilisez find pour obtenir l'objet complet basé sur l'ID
                  options={ingredients}
                  optionLabel="name"
                  placeholder="Choisir un ingrédient"
                  onChange={(e) => {
                    setFieldValue('id_ingredients', e.value.id);
                  }}
                />
                <ErrorMessage name="id_ingredients" />
                <TextField
                  value={values.quantity}
                  onChange={handleChange}
                  label="Quantité"
                  id="quantity"
                  name="quantity"
                  type="number"
                  sx={{ m: 1, width: '100%' }}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
                <ErrorMessage name="quantity" />
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

      {/* Modal delete ingredient */}
      <Dialog
        visible={deleteStockDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Valider"
        modal
        onHide={hideDeleteStockDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {stock && (
            <span>
              {' '}
              Êtes-vous sûr de vouloir supprimer le <b>stock</b>?
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
            onClick={hideDeleteStockDialog}
          />
          <Button
            label="Oui"
            icon="pi pi-check"
            severity="danger"
            onClick={() => deleteStock(stock.id)}
          />
        </Box>
      </Dialog>

      {/* Modal delete selection ingredient */}
      <Dialog
        visible={deleteStocksDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Valider"
        modal
        onHide={hideDeleteStocksDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {stock && (
            <span>
              {' '}
              Êtes-vous sûr de vouloir supprimer plusieurs lignes du stock ?
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
            onClick={hideDeleteStocksDialog}
          />
          <Button
            label="Oui"
            icon="pi pi-check"
            severity="danger"
            onClick={deleteSelectedStocks}
          />
        </Box>
      </Dialog>
    </div>
  );
}

export default CrudStock;
