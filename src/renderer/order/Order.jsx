// Import des dépendances nécessaires
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getAllOrdersByFranchise } from 'renderer/utils/api-call/getAllOrdersByFranchise';
import moment from 'moment';

// Composant pour afficher une "card" d'order
const OrderCard = ({ order }) => {
  const getOrderTypeLabel = (orderTypeId) => {
    console.log('orderTypeId', orderTypeId);
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

  const formattedDate = moment(order.date_order).format('DD-MM-YYYY');
  const formattedHour = moment(order.date_order).format('HH:mm');

  return (
    <Card>
      <CardContent>
        <Typography>Date : {formattedDate}</Typography>
        <Typography>Heure : {formattedHour}</Typography>
        <Typography>Status : {order.status}</Typography>
        <Typography>
          Order Type : {getOrderTypeLabel(order.id_order_type)}
        </Typography>
        <Typography>Prix : {order.total_price}€</Typography>
      </CardContent>
    </Card>
  );
};

const OrdersPage = () => {
  // État pour stocker les données des orders
  const [ordersData, setOrdersData] = useState([]); // Initialisez comme un tableau vide

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
    (order) => order.id_status === '1'
  ).length;

  return (
    <div>
      <Typography variant="h4">
        Récapitulatif des commandes en cours : {numberOfOrdersInProgress}
      </Typography>
      <Grid container spacing={2}>
        {ordersData.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrdersPage;
