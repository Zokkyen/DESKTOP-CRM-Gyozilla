import React, { useState, useEffect, useRef } from 'react';
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
import { getAllIngedients } from 'utils/api-calls/getAllIngredients';
import { Badge } from 'primereact/badge';

const CrudStock = () => {
  let emptyIngredients = {
    name: '',
    quantity: '',
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

useEffect(()=>{
  getAllIngedients()
  .then((res)=>{
    
  })
})


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

const saveIngredient = () => {
    setSubmitted(true);

    if (ingredient.name.trim()) {
        let _ingredients = [...ingredients];
        let _ingredient = { ...ingredient };

        if (ingredient.id) {
            const index = findIndexById(ingredient.id);

            _ingredients[index] = _ingredient;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Updated', life: 3000 });
        } else {
            _ingredient.id = createId();
            _ingredient.image = 'ingredient-placeholder.svg';
            _ingredients.push(_ingredient);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Created', life: 3000 });
        }

        setIngredients(_ingredients);
        setIngredientDialog(false);
        setIngredient(emptyIngredients);
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

const deleteIngredient = () => {
    let _ingredients = ingredients.filter((val) => val.id !== ingredient.id);

    setIngredients(_ingredients);
    setDeleteIngredientDialog(false);
    setIngredient(emptyIngredients);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient Deleted', life: 3000 });
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

const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
};

const exportCSV = () => {
    dt.current.exportCSV();
};

const confirmDeleteSelected = () => {
    setDeleteIngredientsDialog(true);
};

const deleteSelectedIngredients = () => {
    let _ingredients = ingredients.filter((val) => !selectedIngredients.includes(val));

    setIngredients(_ingredients);
    setDeleteIngredientsDialog(false);
    setSelectedIngredients(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ingredient supprimé', life: 3000 });
};

const onCategoryChange = (e) => {
    let _ingredient = { ...ingredient };

    _ingredient['category'] = e.value;
    setIngredient(_ingredient);
};

const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _ingredient = { ...ingredient };

    _ingredient[`${name}`] = val;

    setIngredient(_ingredient);
};

const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _ingredient = { ...ingredient };

    _ingredient[`${name}`] = val;

    setIngredient(_ingredient);
};

const leftToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button style={{marginRight: '6px'}} label="Ajouter" icon="pi pi-plus" severity="success" onClick={openNew} />
            <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedIngredients || !selectedIngredients.length} />
        </div>
    );
};

const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.purchasePrice);
};

const quantityBodyTemplate = (rowData) => {
  if (rowData.quantity > 100) {
    return <Badge value={rowData.quantity} severity="success"></Badge>;
} else if (rowData.quantity >= 50 && rowData.quantity < 100) {
    return <Badge value={rowData.quantity} severity="warning"></Badge>;
} else {
    return <Badge value={rowData.quantity} severity="danger"></Badge>;
}
};

const statusBodyTemplate = (rowData) => {
  if (rowData.quantity > 100) {
    return <Tag value="En Stock" icon="pi pi-check" severity="success"></Tag>;
  } else if (rowData.quantity >= 50 && rowData.quantity < 100) {
    return <Tag value="Stock bas" icon="pi pi-exclamation-triangle" severity="warning"></Tag>;
  } else {
    return <Tag value="Stock épuisé" icon="pi pi-times" severity="danger"></Tag>;
  }
};

const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editIngredient(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteIngredient(rowData)} />
        </React.Fragment>
    );
};


const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 className="m-0">Gestion du stock</h4>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
    </div>
);
const ingredientDialogFooter = (
    <React.Fragment>
        <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Sauvegarder" icon="pi pi-check" onClick={saveIngredient} />
    </React.Fragment>
);
const deleteIngredientDialogFooter = (
    <React.Fragment>
        <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteIngredientDialog} />
        <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteIngredient} />
    </React.Fragment>
);
const deleteIngredientsDialogFooter = (
    <React.Fragment>
        <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteIngredientsDialog} />
        <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedIngredients} />
    </React.Fragment>
);

return (
    <div>
        <Toast ref={toast} />
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable ref={dt} value={ingredients} selection={selectedIngredients} onSelectionChange={(e) => setSelectedIngredients(e.value)}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} ingredients" globalFilter={globalFilter} header={header}>
                <Column selectionMode="multiple" exportable={false}></Column>
                <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="label" header="Libelle" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="purchasePrice" header="Prix" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                <Column field="quantity" header="Quantité" body={quantityBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>

        <Dialog visible={ingredientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Ingredient Details" modal className="p-fluid" footer={ingredientDialogFooter} onHide={hideDialog}>
            <div className="field">
                <label htmlFor="label" className="font-bold">
                    Libellé
                </label>
                <InputText id="label" value={ingredient.name} onChange={(e) => onInputChange(e, 'label')} required autoFocus className={classNames({ 'p-invalid': submitted && !ingredient.name })} />
                {submitted && !ingredient.name && <small className="p-error">Le libelle est obligatoire.</small>}
            </div>

            <div className="formgrid grid">
                <div className="field col">
                    <label htmlFor="purchasePrice" className="font-bold">
                        Prix
                    </label>
                    <InputNumber id="purchasePrice" value={ingredient.purchasePrice} onValueChange={(e) => onInputNumberChange(e, 'purchasePrice')} minFractionDigits={2} mode="currency" currency="EUR" locale="fr-FR" />
                    {submitted && !ingredient.purchasePrice && <small className="p-error">Le prix est obligatoire.</small>}
                </div>
                <div className="field col">
                    <label htmlFor="quantity" className="font-bold">
                        Quantité
                    </label>
                    <InputNumber id="quantity" value={ingredient.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} min={0} max={100}/>
                    {submitted && !ingredient.quantity && <small className="p-error">La quantité est obligatoire.</small>}
                </div>
            </div>
        </Dialog>

        <Dialog visible={deleteIngredientDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Valider" modal footer={deleteIngredientDialogFooter} onHide={hideDeleteIngredientDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {ingredient && (
                    <span>
                        Êtes-vous sûr de vouloir supprimer<b>{ingredient.name}</b>?
                    </span>
                )}
            </div>
        </Dialog>

        <Dialog visible={deleteIngredientsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Valider" modal footer={deleteIngredientsDialogFooter} onHide={hideDeleteIngredientsDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {ingredient && <span>Êtes-vous sûr de vouloir supprimer l'ingrédient ?</span>}
            </div>
        </Dialog>
    </div>
);
}

export default CrudStock