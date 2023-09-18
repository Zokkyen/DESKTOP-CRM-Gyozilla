/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Badge,
} from '@mui/material';
import moment from 'moment';
import { Box, padding } from '@mui/system';

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
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import CookieIcon from '@mui/icons-material/Cookie';
import { io } from 'socket.io-client';
import { Toast } from 'primereact/toast';
import {
  getCustomerFromOrder,
  getOrderLinesByOrderId,
  patchOrder,
  getProductsById,
} from 'renderer/utils/api-call/order';
import { getAllOrdersByFranchise } from 'renderer/utils/api-call/getAllOrdersByFranchise';
import { UserContext } from 'renderer/utils/context/UserContext';
import IconsTab from './IconsTab';
import useCountdown from './useCountdown';

import './Order.css';
// Composant pour afficher une "card" d'order
function OrderCard({ order, setOrdersData, toast }) {
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
        toast.current.show({
          severity: 'success',
          summary: "C'est parti",
          detail: 'Commande en cours de préparation',
          life: 3000,
        });
        data = { id_status: 3 };
      } else if (order.id_status === 3) {
        toast.current.show({
          severity: 'success',
          summary: 'Yes',
          detail: 'La commande est prête',
          life: 3000,
        });
        data = { id_status: 4 };
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

  const formattedDate = moment(order.createdAt).format('DD-MM-YYYY');
  const formattedHour = moment(order.createdAt).format('HH:mm');
  const currentHour = moment().format('HH:mm');
  let minutes;
  let seconds;

  // recuperation du hook personnalisé pour le compte a rebours
  const remainingTime = useCountdown(order.createdAt);
  // const remainingTime = '15:00';

  let iconElapsedColor = 'black';

  if (remainingTime) {
    const minutesValue = parseInt(remainingTime.split(':')[0]);
    if (minutesValue >= 10) {
      iconElapsedColor = 'red';
    }
  }

  const productInOrders = order.order_lines[0].products;
  // console.log('order.order_lines', order.order_lines);
  const result = [];
  let stopPlats = 0;
  let stopEntrees = 0;
  let stopDesserts = 0;
  let stopBoissons = 0;

  // trier le tableau en fonction de product categories
  order.order_lines.sort(
    (a, b) =>
      a.products.id_product_categories - b.products.id_product_categories
  ); // Tri par id_product_categories

  // boucle pour afficher les plats de la commande
  order.order_lines.map((value, index) => {
    // "stop" pour afficher le titre "plats" par exemple et ne plus l'afficher si plusieurs plats
    if (stopPlats === 0 && value.products.id_product_categories === 2) {
      result.push(
        <Typography
          sx={{
            marginTop: 3,
            height: '3vh',
            backgroundColor: 'rgba(160,160,160,0.4)',
            alignItems: 'center',
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          {' '}
          <RamenDiningIcon sx={{ marginRight: '18px', color: 'black' }} />
          Plats
        </Typography>
      );
      stopPlats++;
    }
    if (stopEntrees === 0 && value.products.id_product_categories === 1) {
      result.push(
        <Typography
          sx={{
            marginTop: 3,
            height: '3vh',
            backgroundColor: 'rgba(160,160,160,0.4)',
            alignItems: 'center',
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          {' '}
          <RoomServiceIcon sx={{ marginRight: '18px', color: 'black' }} />
          Entrées
        </Typography>
      );
      stopEntrees++;
    }
    if (stopDesserts === 0 && value.products.id_product_categories === 3) {
      result.push(
        <Typography
          sx={{
            marginTop: 3,
            height: '3vh',
            backgroundColor: 'rgba(160,160,160,0.4)',
            alignItems: 'center',
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          {' '}
          <CookieIcon sx={{ marginRight: '18px', color: 'black' }} />
          Desserts
        </Typography>
      );
      stopDesserts++;
    }
    if (stopBoissons === 0 && value.products.id_product_categories === 4) {
      result.push(
        <Typography
          sx={{
            marginTop: 3,
            height: '3vh',
            backgroundColor: 'rgba(160,160,160,0.4)',
            alignItems: 'center',
            display: 'flex',
            fontWeight: 'bold',
          }}
        >
          <LocalBarIcon sx={{ marginRight: '18px', color: 'black' }} />
          Boissons
        </Typography>
      );
      stopBoissons++;
    }

    result.push(
      <Box
        sx={{
          padding: 1,
          display: 'flex',
        }}
      >
        <Typography sx={{ fontWeight: 'bold', marginRight: 5 }}>
          {value.quantity}{' '}
        </Typography>
        <Typography>{value.products.name}</Typography>
      </Box>
    );
  });
  console.log('remainingTime', remainingTime);
  console.log('orderinorder', order);
  return (
    <Card
      sx={{
        margin: 2,
        padding: 0,
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Toast ref={toast} />
      <CardContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: 0,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f6a40055',
              padding: 0,
            }}
          >
            <Typography>{getOrderStatusLabel(order.id_status)}</Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              {formattedHour}
            </Typography>
            <NotificationsActiveIcon
              sx={{
                marginLeft: '35px',
                color: remainingTime === '00:00' ? 'red' : 'inherit', // Appliquer la couleur rouge
                animation:
                  remainingTime === '00:00' ? 'alarm 0.8s infinite' : 'none', // Animation d'alarme
              }}
            />
            {(order.id_status === 2 || order.id_status === 3) && (
              <Typography
                sx={{
                  marginLeft: '10px',
                  fontSize: remainingTime === '00:00' ? '1.2rem' : '1rem', // Agrandir le chrono
                  color: remainingTime === '00:00' ? 'red' : 'inherit', // Appliquer la couleur rouge
                }}
              >
                {remainingTime}
              </Typography>
            )}
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
                : `${
                    order.customers.firstname
                  } ${order.customers.lastname.charAt(0)}.`}
            </Typography>
          </Box>
          {/* Affichage des plats, desserts,... */}
          <Box sx={{}}>
            <>
              {result.map((value, index) => (
                <Box key={index}>{value}</Box>
              ))}
            </>
            <Typography sx={{ padding: 1, fontWeight: 'bold' }}>
              Prix : {order.total_price}€
            </Typography>
          </Box>
        </Box>
      </CardContent>
      {/* BOX BUTTON */}
      <Box
        sx={{
          justifyContent: 'flex-end',
          alignSelf: 'center',
          paddingBottom: 0,
          margin: 2,
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
        ) : order.id_status === 3 ? (
          <Button
            sx={{ padding: '8px', fontSize: '0.7rem' }}
            onClick={() => handleUpdateStatus(order.id)}
          >
            {' '}
            <DoneIcon sx={{ marginRight: '8px' }} />
            Marquer comme prête
          </Button>
        ) : null}
      </Box>
    </Card>
  );
}

function OrdersPage() {
  // États pour gérer les onglets et les commandes
  const [selectedTab, setSelectedTab] = useState(0);
  // État pour stocker les données des orders
  const [ordersData, setOrdersData] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const toast = useRef(null);
  const { user } = useContext(UserContext);

  // Récupère les orders depuis la base de données
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await getAllOrdersByFranchise(user.franchise);
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

  // Calcule le nombre de commandes en cours
  const numberOfOrdersInProgress = ordersData.filter(
    (order) => order.id_status === 2
  ).length;
  // Calcule le nombre de commandes en cours
  const numberOfOrdersInPrepa = ordersData.filter(
    (order) => order.id_status === 3
  ).length;
  // Calcule le nombre de commandes en cours
  const numberOfOrdersPrepared = ordersData.filter(
    (order) => order.id_status === 4
  ).length;

  // Filtrer les commandes dont le statut est "payée"
  const paidOrders = ordersData.filter((order) => order.id_status === 2);
  // Filtrer les commandes dont le statut est "en cours de prepa"
  const prepaOrders = ordersData.filter((order) => order.id_status === 3);
  // Filtrer les commandes dont le statut est "prête"
  const preparedOrders = ordersData.filter((order) => order.id_status === 4);

  // Filtrer et compter les commandes pour chaque statut
  const ordersCounts = [
    ordersData.filter((order) => order.id_status === 2).length,
    ordersData.filter((order) => order.id_status === 3).length,
    ordersData.filter((order) => order.id_status === 4).length,
  ];

  // Gérer le changement d'onglet
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Filtrer les commandes en fonction de l'onglet sélectionné
  const filteredOrders = ordersData.filter((order) => {
    switch (selectedTab) {
      case 0:
        return order.id_status === 2;
      case 1:
        return order.id_status === 3;
      case 2:
        return order.id_status === 4;
      default:
        return false;
    }
  });

  return (
    <Box
      style={{
        width: '80vw',
        height: '100%',
        margin: '-24px',
      }}
    >
      <Toast ref={toast} />

      {/* Utilisation du composant d'onglet d'icônes */}
      <IconsTab
        tabValue={selectedTab}
        handleTabChange={handleTabChange}
        ordersCounts={ordersCounts}
      />

      {/* Ajout d'un espace pour les onglets */}
      <Box style={{ height: '250px' }} />

      {/* Utilisation de filteredOrders au lieu de paidOrders, prepaOrders, preparedOrders */}
      <Grid
        container
        spacing={1}
        sx={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {filteredOrders.map((order) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={order.id}
            sx={{ paddingLeft: 0 }}
          >
            <OrderCard
              order={order}
              setOrdersData={setOrdersData}
              toast={toast}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default OrdersPage;
