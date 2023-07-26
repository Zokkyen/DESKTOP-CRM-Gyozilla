import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import arrayNavigation from 'renderer/drawerNavigation';
import Main from 'component/Main';
import AppBar from 'component/AppBar';
import DrawerHeader from 'component/DrawerHeader';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/icon.png';
import { UserContext } from '../utils/context/UserContext';

const drawerWidth = 240;

function HomeDrawer() {
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedItem, setSelectedItem] = React.useState(arrayNavigation[0]);
  const [mainContent, setMainContent] = React.useState(null); // État pour suivre le contenu du MAIN

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setMainContent(null);
  };

  const handleComponentLinkClick = (component) => {
    setMainContent(component);
  };

  // Fonction callback qui renverra handleComponentLinkClick
  const callback = (component) => {
    handleComponentLinkClick(component);
  };

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: '#212830', color: '#FFF' }}
        position="fixed"
        open={open}
        drawerWidth={drawerWidth}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuOpenIcon />
          </IconButton>
          <img style={{ width: '80px' }} src={icon} alt="Logo" />
          <Button
            style={{ color: 'white', backgroundColor: '#212830' }}
            id="demo-positioned-button"
            aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
          >
            {user.lastname} {user.firstname}
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            style={{ color: '#212830' }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Mon profil</MenuItem>
            <MenuItem onClick={handleClose}>Mon compte</MenuItem>
            <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#212830',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ backgroundColor: '#212830' }}>
          <IconButton style={{ color: '#FFFF' }} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List style={{ backgroundColor: '#212830', color: '#FFFF' }}>
          {arrayNavigation.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                style={{
                  backgroundColor:
                    item === selectedItem ? '#f6a400' : '#212830',
                }}
                onClick={() => handleItemClick(item)}
              >
                <ListItemIcon style={{ color: '#FFFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} drawerWidth={drawerWidth}>
        {/* Utilisez le composant component.callback pour transmettre la fonction callback à drawerNavigation */}
        {mainContent
          ? mainContent
          : selectedItem.component.callback({ callback })}
      </Main>
    </Box>
  );
}

export default HomeDrawer;
