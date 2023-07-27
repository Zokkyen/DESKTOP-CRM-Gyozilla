/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import React from 'react';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import CrudStock from 'renderer/crudStock/CrudStock';
import OrdersPage from 'renderer/order/Order';
import './Home.css';

function Home({ onLinkClick }) {
  const handleLinkClick = (component) => {
    onLinkClick(component);
  };

  return (
    <Box sx={{ width: '80vw' }} className="orders-container">
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={6}>
          <Card onClick={() => handleLinkClick(<CrudProducts />)}>
            <CardActionArea>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#4e706f',
                }}
              >
                <RamenDiningIcon
                  style={{ color: '#FFFF', width: '4rem', height: '3rem' }}
                />
                <Typography variant="h3" color="HighlightText">
                  LINK1
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card onClick={() => handleLinkClick(<CrudStock />)}>
            <CardActionArea>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#4e706f',
                }}
              >
                <RamenDiningIcon
                  style={{ color: '#FFFF', width: '4rem', height: '3rem' }}
                />
                <Typography variant="h3" color="HighlightText">
                  LINK2
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card onClick={() => handleLinkClick(<CrudProducts />)}>
            <CardActionArea>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#4e706f',
                }}
              >
                <RamenDiningIcon
                  style={{ color: '#FFFF', width: '4rem', height: '3rem' }}
                />
                <Typography variant="h3" color="HighlightText">
                  LINK3
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card onClick={() => handleLinkClick(<CrudProducts />)}>
            <CardActionArea>
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#4e706f',
                }}
              >
                <RamenDiningIcon
                  style={{ color: '#FFFF', width: '4rem', height: '3rem' }}
                />
                <Typography variant="h3" color="HighlightText">
                  LINK4
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      {/* <CrudEmployee></CrudEmployee> */}
      <OrdersPage />
    </Box>
  );
}

export default Home;
