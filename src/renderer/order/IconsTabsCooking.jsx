import React from 'react';
import { Tabs, Tab, Badge, Box } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function IconsTabCooking({ tabValue, handleTabChange, cookCounts }) {
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
          <Badge badgeContent={cookCounts[0]} color="primary">
            <HourglassEmptyIcon
              sx={{ color: 'red', width: '150px', height: '150px' }}
            />
          </Badge>
        }
        label="En préparation"
        sx={{ padding: 2, backgroundColor: 'white', opacity: 'inherit' }}
      />
      <Tab
        icon={
          <Badge badgeContent={cookCounts[1]} color="primary">
            <AutorenewIcon
              sx={{ color: 'orange', width: '150px', height: '150px' }}
            />
          </Badge>
        }
        label="Prête"
        sx={{ padding: 2, backgroundColor: 'white', opacity: 'inherit' }}
      />
    </Tabs>
  );
}

export default IconsTabCooking;
