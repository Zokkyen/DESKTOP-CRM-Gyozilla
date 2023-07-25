import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BusinessIcon from '@mui/icons-material/Business';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StorageIcon from '@mui/icons-material/Storage';

const CustomDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleListItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div>
      <Button onClick={handleDrawerOpen}>Ouvrir le Drawer</Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
        <List>
          <ListItem
            button
            onClick={() => handleListItemClick('employees')}
            selected={activeItem === 'employees'}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Employés" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleListItemClick('revenue')}
            selected={activeItem === 'revenue'}
          >
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="CA" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleListItemClick('products')}
            selected={activeItem === 'products'}
          >
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Produits" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleListItemClick('stock')}
            selected={activeItem === 'stock'}
          >
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
