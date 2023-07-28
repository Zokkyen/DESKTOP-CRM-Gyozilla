import React, { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Badge,
} from '@mui/material';
import { getAllOrdersByFranchise } from 'renderer/utils/api-call/getAllOrdersByFranchise';
import moment from 'moment';
import { Box, padding } from '@mui/system';
import {
  getCustomerFromOrder,
  getOrderLinesByOrderId,
  patchOrder,
  getProductsById,
} from 'renderer/utils/api-call/order';

// Import des icônes
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VerifiedIcon from '@mui/icons-material/Verified';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { io } from 'socket.io-client';
import { Toast } from 'primereact/toast';

// Composant pour afficher une "card" d'order
function OrderCard({ order, setOrdersData }) {
  const toast = useRef(null);

  const getOrderTypeLabel = (orderTypeId) => {
    switch (orderTypeId) {
      case 1:
        return 'A emporter';
      case 2:
        return 'A livrer';
      case 3:
        return 'Sur place';
      default:
        return 'Type de commande inconnu';
    }
  };

  const getOrderTypeColor = (orderTypeId) => {
    switch (orderTypeId) {
      case 1:
        return '#7ADEE8';
      case 2:
        return '#EDB02E';
      case 3:
        return '#BD9BE2';
      default:
        return 'black';
    }
  };

  const getOrderTypeIcon = (orderTypeId) => {
    switch (orderTypeId) {
      case 1:
        return <LocalMallIcon sx={{ marginRight: '8px' }} />; // Icon for Click & Collect
      case 2:
        return <DeliveryDiningIcon sx={{ marginRight: '8px' }} />; // Icon for Livraison à domicile
      case 3:
        return <RestaurantIcon sx={{ marginRight: '8px' }} />; // Icon for Consommation sur place
      default:
        return null; // No icon for unknown types
    }
  };

  const getOrderStatusLabel = (orderStatusId) => {
    switch (orderStatusId) {
      case 1:
        return 'Paiement en attente';
      case 2:
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <HourglassEmptyIcon sx={{ marginRight: '8px', color: 'black' }} />
          </span>
        );
      case 3:
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <AutorenewIcon sx={{ marginRight: '8px', color: 'black' }} />
          </span>
        );
      case 4:
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <VerifiedIcon sx={{ marginRight: '8px', color: 'black' }} />
          </span>
        );
      case 5:
        return 'Livrée';
      default:
        return 'Status non renseigné';
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      let data;
      if (order.id_status === 2) {
        data = { id_status: 3 };
      } else if (order.id_status === 3) {
        data = { id_status: 4 };
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'La commande est prête',
          life: 2000,
        });
      }
      await patchOrder(id, data);
      setOrdersData((prevState) =>
        prevState.map((prevOrder) =>
          prevOrder.id === id
            ? { ...prevOrder, id_status: data.id_status }
            : prevOrder
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  };

  const formattedDate = moment(order.date_order).format('DD-MM-YYYY');
  const formattedHour = moment(order.date_order).format('HH:mm');
  const currentHour = moment().format('HH:mm');

  // Nouvel état local pour stocker l'heure de début de la commande
  const [elapsedTime, setElapsedTime] = useState('');
  var minutes;
  var seconds;

  // Utiliser une référence pour l'intervalle
  const intervalRef = useRef(null);

  useEffect(() => {
    // Vérifier si order.date_order est supérieur à moment() avant de démarrer l'intervalle
    if (moment(order.date_order).isAfter(moment())) {
      return; // Ne rien faire si order.date_order est supérieur à moment()
    }
    // Créer l'intervalle
    intervalRef.current = setInterval(() => {
      let time = moment().diff(moment(order.date_order));
      // Conversion en minutes et secondes
      var duration = moment.duration(time);
      minutes = duration.minutes();
      seconds = duration.seconds();

      setElapsedTime(minutes + ':' + seconds);

      // Arrêter l'intervalle si le temps de préparation atteint 15 minutes
      if (minutes >= 15) {
        clearInterval(intervalRef.current);

        setElapsedTime('delai de preparation depassé');
      }
    }, 1000);

    // Nettoyer l'intervalle lorsqu'un nouveau composant est monté ou démonté
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [order.date_order]);

  // const iconElapsedColor = elapsedTime ? 'red' : 'black';
  let iconElapsedColor = 'black';

  if (elapsedTime) {
    const minutesValue = parseInt(elapsedTime.split(':')[0]);
    if (minutesValue >= 10) {
      iconElapsedColor = 'red';
    }
  }
  if (elapsedTime === 'delai de preparation depassé') {
    iconElapsedColor = 'red';
  }

  const productInOrders = order.order_lines[0].products;
  console.log('order.order_lines', order.order_lines[0].products);

  return (
    <Card sx={{ margin: 2, padding: 0 }}>
      <Toast ref={toast} />
      <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f6a40055',
            }}
          >
            <Typography>{getOrderStatusLabel(order.id_status)}</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              {formattedHour}
            </Typography>
            <NotificationsActiveIcon
              sx={{ marginLeft: '35px', color: iconElapsedColor }}
            />
            <Typography sx={{ marginLeft: '10px' }}>{elapsedTime}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#f6a40055',
              padding: 1,
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40%',
                fontSize: '0.7rem',
                borderRadius: '50px',
                textTransform: 'none',
                pointerEvents: 'none',
                backgroundColor: getOrderTypeColor(order.id_order_types),
                color: 'black',
              }}
            >
              {getOrderTypeIcon(order.id_order_types)}
              {getOrderTypeLabel(order.id_order_types)}
            </Button>
            <Typography sx={{ fontWeight: 'bold' }}>#{order.id}</Typography>

            <Typography>
              {!order.customers
                ? 'N/A'
                : order.customers.firstname +
                  ' ' +
                  order.customers.lastname.charAt(0) +
                  '.'}
            </Typography>
          </Box>

          <Box sx={{ padding: 1 }}>
            <Typography>{order.order_lines[0].products.name}</Typography>
            <Typography></Typography>
            <Typography></Typography>

            <Typography>Prix : {order.total_price}€</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 0,
            }}
          >
            {order.id_status === 2 ? (
              <Button
                sx={{ padding: '8px', fontSize: '0.7rem' }}
                onClick={() => handleUpdateStatus(order.id)}
              >
                {' '}
                <PlayArrowIcon sx={{ marginRight: '8px' }} />
                Commencer la préparation
              </Button>
            ) : (
              <Button
                sx={{ padding: '8px', fontSize: '0.7rem' }}
                onClick={() => handleUpdateStatus(order.id)}
              >
                {' '}
                <DoneIcon sx={{ marginRight: '8px' }} />
                Marquer comme prête
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function OrdersPage() {
  // État pour stocker les données des orders
  const [ordersData, setOrdersData] = useState([]);

  // Récupère les orders depuis la base de données
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await getAllOrdersByFranchise(1);
        setOrdersData(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des orders :', error);
      }
    };

    fetchOrdersData();
    // const socket = io();
    // socket.on('dataInsert', () => {
    //   console.log('nouvelleDonnées');
    // });
  }, []);
  console.log('ordersData', ordersData);

  // Calcule le nombre de commandes en cours
  const numberOfOrdersInProgress = ordersData.filter(
    (order) => order.id_status === 2
  ).length;

  // Filtrer les commandes dont le statut est "payée"
  const paidOrders = ordersData.filter(
    (order) => order.id_status === 2 || order.id_status === 3
  );

  return (
    <div>
      <Typography variant="h4">
        Récapitulatif des commandes en cours : {numberOfOrdersInProgress}
      </Typography>
      <Grid container spacing={2}>
        {paidOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <OrderCard order={order} setOrdersData={setOrdersData} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default OrdersPage;
