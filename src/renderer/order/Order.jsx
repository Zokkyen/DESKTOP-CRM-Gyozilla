// Import des dépendances nécessaires
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getAllOrdersByFranchise } from 'renderer/utils/api-call/getAllOrdersByFranchise';
import moment from 'moment';

// Composant pour afficher une "card" d'order
const OrderCard = ({ order }) => {
  const getOrderTypeLabel = (orderTypeId) => {
    switch (orderTypeId) {
      case 1:
        return 'Click & Collect';
      case 2:
        return 'Livraison à domicile';
      case 3:
        return 'Consommation sur place';
      default:
        return 'Type de commande inconnu';
    }
  };

  const getOrderStatusLabel = (orderStatusId) => {
    switch (orderStatusId) {
      case 1:
        return 'Paiement en attente';
      case 2:
        return 'Payée';
      case 3:
        return 'En cours de préparation';
      case 4:
        return 'Préparée';
      case 5:
        return 'Livrée';
      default:
        return 'Status non renseigné';
    }
  };

  const get

  const formattedDate = moment(order.date_order).format('DD-MM-YYYY');
  const formattedHour = moment(order.date_order).format('HH:mm');

  return (
    <Card>
      <CardContent>
        <Typography>Date : {formattedDate}</Typography>
        <Typography>Heure : {formattedHour}</Typography>
        <Typography>Status : {getOrderStatusLabel(order.id_status)}</Typography>
        <Typography>
          Order Type : {getOrderTypeLabel(order.id_order_types)}
        </Typography>
        <Typography>Prix : {order.total_price}€</Typography>
      </CardContent>
    </Card>
  );
};

const OrdersPage = () => {
  // État pour stocker les données des orders
  const [ordersData, setOrdersData] = useState([]);
  console.log('ordersData', ordersData);

  //Récupère les orders depuis la base de données
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        // Appelez la fonction pour récupérer les orders (vous pouvez passer l'id du client approprié ici)
        const response = await getAllOrdersByFranchise(1);
        // Mettez à jour l'état avec les données récupérées
        setOrdersData(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des orders :', error);
      }
    };

    fetchOrdersData();
  }, []);

  //Calcule le nombre de commandes en cours
  const numberOfOrdersInProgress = ordersData.filter(
    (order) => order.id_status === 2
  ).length;

  // Filtrer les commandes dont le statut est "payée"
  const paidOrders = ordersData.filter((order) => order.id_status === 2);
  console.log('paidOrders', paidOrders);

  return (
    <div>
      <Typography variant="h4">
        Récapitulatif des commandes en cours : {numberOfOrdersInProgress}
      </Typography>
      <Grid container spacing={2}>
        {paidOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrdersPage;
