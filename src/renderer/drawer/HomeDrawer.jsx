/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 2,
    marginLeft: '20px',
    marginTop: theme.spacing(1),
    minWidth: 150,
    minHeight: 'fit-content',
    paddingBottom: '5px',
    color: '#EAEAEA',
    backgroundColor: '#212830',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',

    '& .MuiMenuItem-root:hover': {
      backgroundColor: '#EAEAEA',
      color: '#212830',
    },
  },
}));

export default function HomeDrawer() {
  const { user, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedItem, setSelectedItem] = useState(arrayNavigation[0]);
  const [mainContent, setMainContent] = useState(null); // État pour suivre le contenu du MAIN

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setMainContent(null);
    handleDrawerClose();
  };

  const handleComponentLinkClick = (component) => {
    setMainContent(component);
  };

  // Fonction callback qui renverra handleComponentLinkClick
  const callback = (component) => {
    handleComponentLinkClick(component);
  };

  const handleProfile = () => {
    const profileItem = arrayNavigation.find((item) => item.label === 'Profil');
    handleItemClick(profileItem);
  };

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '10vh',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuOpenIcon />
          </IconButton>
          <img
            style={{
              width: '80px',
              display: open ? 'none' : 'block',
              marginLeft: '135px',
            }}
            src={icon}
            alt="Logo"
          />
          <Button
            variant="blackened"
            style={{
              display: open ? 'none' : 'flex',
            }}
            id="demo-positioned-button"
            aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
          >
            {user.lastname} {user.firstname}
            <KeyboardArrowDownIcon />
          </Button>
          <StyledMenu
            style={{ color: '#212830' }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Mon profil</MenuItem>
            <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
          </StyledMenu>
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
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {arrayNavigation.map((item) => (
            <ListItem
              key={`item${Math.random(3)}`}
              disablePadding
              className={item === selectedItem ? 'active' : null}
            >
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemIcon style={{ color: '#FFFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        {/* Utilisez le composant component.callback pour transmettre la fonction callback à drawerNavigation */}
        {mainContent || selectedItem.component.callback({ callback })}
      </Main>
    </Box>
  );
}
