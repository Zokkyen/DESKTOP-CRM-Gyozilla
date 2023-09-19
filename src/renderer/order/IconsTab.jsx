/* eslint-disable react/prop-types */
import React from 'react';
import { Tabs, Tab, Badge } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function IconsTab({ tabValue, handleTabChange, ordersCounts }) {
  return (
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      centered
      sx={{
        position: 'fixed',
        width: '100%',
        zIndex: 1,
        padding: 0,
        backgroundColor: 'white',
      }}
    >
      <Tab
        icon={
          <Badge badgeContent={ordersCounts[0]} color="primary">
            <HourglassEmptyIcon
              sx={{ color: 'red', width: '150px', height: '150px' }}
            />
          </Badge>
        }
        label="En attente"
        sx={{ padding: 2, backgroundColor: 'white', opacity: 'inherit' }}
      />
      <Tab
        icon={
          <Badge badgeContent={ordersCounts[1]} color="primary">
            <AutorenewIcon
              sx={{ color: 'orange', width: '150px', height: '150px' }}
            />
          </Badge>
        }
        label="En préparation"
        sx={{ padding: 2, backgroundColor: 'white', opacity: 'inherit' }}
      />
      <Tab
        icon={
          <Badge badgeContent={ordersCounts[2]} color="primary">
            <DoneIcon
              sx={{ color: 'green', width: '150px', height: '150px' }}
            />
          </Badge>
        }
        label="Prêtes"
        sx={{ padding: 2, backgroundColor: 'white', opacity: 'inherit' }}
      />
    </Tabs>
  );
}

export default IconsTab;
