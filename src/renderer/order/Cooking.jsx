/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import './Cooking.css'; // Assurez-vous de créer ce fichier CSS pour personnaliser le style du tableau
import { Box, padding } from '@mui/system';
import { Typography } from '@mui/material';
import { Toast } from 'primereact/toast';
import { editOrderLines } from 'renderer/utils/api-call/order';
import { getAllOrdersByFranchise } from 'renderer/utils/api-call/getAllOrdersByFranchise';
import IconsTabCooking from './IconsTabsCooking';
import useCountdown from './useCountdown';

function OrderTable({ order }) {
  const [ordersData, setOrdersData] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cookCounts, setCookCounts] = useState(true);
  // recuperation du hook personnalisé pour le compte a rebours
  const remainingTime = useCountdown(order);

  useEffect(() => {
    // Récupération des données des commandes au chargement initial
    const fetchOrdersData = async () => {
      try {
        await getAllOrdersByFranchise(1)
          .then((response) => {
            setOrdersData(response.data.data);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error('Erreur lors de la récupération des orders :', error);
      }
    };
    if (loading) {
      fetchOrdersData();
    }
  }, [loading]);

  // Gérer le changement d'onglet
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Fonction pour marquer une commande comme prête
  const handlePrepareOrder = async (order) => {
    await editOrderLines(order.id, { status: true }).finally(() => {
      setLoading(true);
      // Affichez le toast de PrimeReact lorsque le bouton est cliqué
      toastRef.current.show({
        severity: 'success',
        summary: 'Produit préparé !',
        life: 3000, // Durée d'affichage du toast en millisecondes (facultatif)
      });
    });
  };

  // Mapping des catégories de produits
  const categoryMap = {
    1: 'Entrées',
    2: 'Plats',
  };

  useEffect(() => {
    // Mise à jour des compteurs de commandes prêtes et non prêtes
    if (ordersData.length !== 0) {
      let nonReadyCount = 0;
      let readyCount = 0;

      const updatedPreparingOrders = [];
      const preparingRows = [];

      ordersData.forEach((order) => {
        order.order_lines.forEach((ol) => {
          if (
            !ol.status && // Commande non prête
            ol.products.id_product_categories !== 3 &&
            ol.products.id_product_categories !== 4
          ) {
            updatedPreparingOrders.push(ol);
            nonReadyCount++; // Incrémente le compteur des commandes non prêtes
          } else if (ol.status) {
            readyCount++; // Incrémente le compteur des commandes prêtes
          }
        });
      });

      updatedPreparingOrders.forEach((order) => {
        preparingRows.push({
          id: order.id,
          productName: order.products.name,
          category: categoryMap[order.products.id_product_categories],
          date: moment(order.createdAt).format('DD-MM-YYYY'),
          time: moment(order.createdAt).format('HH:mm'),
          // timer: remainingTime,
          quantity: order.quantity,
        });
      });

      setPreparingOrders(preparingRows);
      setCookCounts([nonReadyCount, readyCount]); // Met à jour les compteurs correctement
    }
  }, [ordersData]);

  useEffect(() => {
    // Mise à jour des commandes préparées
    if (ordersData.length !== 0) {
      const updatedPreparedOrders = [];
      const preparedRows = [];
      ordersData.forEach((o) => {
        o.order_lines.forEach((ol) => {
          if (
            ol.status &&
            ol.products.id_product_categories !== 3 &&
            ol.products.id_product_categories !== 4
          ) {
            updatedPreparedOrders.push(ol);
          }
        });
      });

      updatedPreparedOrders.forEach((order) => {
        preparedRows.push({
          id: order.id,
          productName: order.products.name,
          category: categoryMap[order.products.id_product_categories],
          date: moment(order.createdAt).format('DD-MM-YYYY'),
          time: moment(order.createdAt).format('HH:mm'),
          quantity: order.quantity,
        });
      });

      setPreparedOrders(preparedRows);
    }
  }, [ordersData]);

  // Modifier la fonction getCategoryClassName
  const getCategoryClassName = (category) => {
    if (category === 'Entrées') {
      return 'category-1';
    }
    if (category === 'Plats') {
      return 'category-2';
    }
    return 'category-unknown';
  };
  const toastRef = useRef(null);

  return (
    <div className="order-table">
      {/* Utilisation du composant d'onglet d'icônes */}
      <IconsTabCooking
        tabValue={selectedTab}
        handleTabChange={handleTabChange}
        cookCounts={cookCounts}
      />
      <Box sx={{ height: '300px' }} />
      {selectedTab === 0 ? (
        preparingOrders.length > 0 ? (
          <DataTable
            value={preparingOrders}
            className="table"
            rowClassName={(rowData) => getCategoryClassName(rowData.category)}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
          >
            <Column field="productName" header="Nom du produit" />
            <Column
              field="category"
              header="Catégorie"
              body={(rowData) => (
                <span
                  style={{
                    padding: '8px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    color: 'black',
                  }}
                >
                  {rowData.category}
                </span>
              )}
            />
            <Column field="date" header="Date" />
            <Column field="time" header="Heure" />

            <Column field="quantity" header="Quantité" />
            <Column
              body={(rowData) => (
                <button onClick={() => handlePrepareOrder(rowData)}>
                  Prêt
                </button>
              )}
            />
          </DataTable>
        ) : (
          <Typography>Il n'y a aucune commande en cours</Typography>
        )
      ) : null}
      {selectedTab === 1 ? (
        preparedOrders.length > 0 ? (
          <DataTable
            value={preparedOrders}
            className="table"
            rowClassName={(rowData) => getCategoryClassName(rowData.category)}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
          >
            <Column field="productName" header="Nom du produit" />
            <Column field="category" header="Catégorie" />
            <Column field="date" header="Date" />
            <Column field="time" header="Heure" />
            <Column field="quantity" header="Quantité" />
          </DataTable>
        ) : (
          <Typography />
        )
      ) : null}
      <Toast ref={toastRef} />{' '}
    </div>
  );
}

export default OrderTable;
