import { createTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';

const bp = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    mmd: 1125,
    lg: 1390,
    xl: 1536,
  },
});
const theme = createTheme({
  components: {
    //        Style des icones SVG       //
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          color: '#ffffff',
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            '& .MuiTypography-root': {
              color: '#ffffff', // Change the text color on hover.
            },
            '& .MuiSvgIcon-root': {
              color: '#ffffff', // Change the text color on hover.
            },
            backgroundColor: '#f6a400',
          },
          '&.active': {
            color: '#f6a400',
            borderRight: '5px solid #f6a400',
          },
          '&.active svg': {
            color: '#f6a400',
          },
          '&.active span': {
            color: '#f6a400',
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#FFFFFF',
          fontSize: '1.5rem',
          [bp.down('md')]: {
            fontSize: '0.5rem',
            padding: '0px',
          },
        },
      },
    },

    //        Style du drawer       //
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#212830',
        },
      },
    },

    //        Style AppBar        //

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#212830',
          color: '#FFF',
        },
      },
    },

    //        Style des boutons        //
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#EAEAEA',
          backgroundColor: '#4c6e65',
          fontSize: '1.0rem',
          fontWeight: 'bold',
          '&:hover': {
            color: '#EAEAEA',
            backgroundColor: '#f6a400',
            border: '1px solid #f6a400',
          },
        },
        outlined: {
          color: '#f6a400',
          backgroundColor: '#EAEAEA',
          border: '1px solid #f6a400',
          marginTop: '3vh',
        },
        contained: {
          color: '#EAEAEA',
          backgroundColor: '#f6a400',
          border: '1px solid #EAEAEA',
          marginTop: '3vh',
          '&:hover': {
            color: '#f6a400',
            backgroundColor: '#EAEAEA',
            border: '1px solid #f6a400',
          },
        },
        annule: {
          backgroundColor: 'red',
          color: 'green',
          border: '1px solid yellow',
        },
        blackened: {
          color: '#EAEAEA',
          backgroundColor: '#212830',
          border: '1px solid #212830',
          marginTop: '3vh',
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.1)',
            color: '#FFFFFF',
            backgroundColor: '#212830',
            border: '1px solid #212830',
          },
        },
      },
    },
  },
  //        Style de la pagination        //
  MuiPaginationItem: {
    styleOverrides: {
      page: {
        '&&.Mui-selected': {
          backgroundColor: '#5F8D85',
          color: 'white',
        },
        '&&.Mui-selected:hover': {
          backgroundColor: '#5F8D85',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#f6a400',
    },
    title: {
      main: '#f6a400',
    },
    secondary: {
      main: '#5F8D85',
    },
    subTitle: {
      main: '#5F8D85',
    },
    paragraph: {
      main: '#182A27',
    },
  },
  //        Style des typographies        //
  typography: {
    fontFamily: 'Garamond',
    h5: {
      color: '#f6a400',
      fontSize: '4rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h6: {
      color: '#f6a400',
      fontSize: '2.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h6g: {
      color: '#5F8D85',
      fontSize: '2.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h6b: {
      color: '#000',
      fontSize: '2.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    hbox: {
      color: '#f6a400',
      fontSize: '1.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    hboxnb: {
      color: '#000',
      fontSize: '1.5rem',
      fontFamily: 'Garamond',
    },
    hboxb: {
      color: '#000000',
      fontSize: '1.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    hboxg: {
      color: '#5F8D85',
      fontSize: '1.5rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    h7: {
      color: '#f6a400',
      fontSize: '1.2rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    h7b: {
      color: '#000000',
      fontSize: '1.2rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    h7g: {
      color: '#5F8D85',
      fontSize: '2.0rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h7bnw: {
      color: '#000000',
      fontSize: '1.2rem',
      fontFamily: 'Garamond',
    },
    h7w: {
      color: '#EAEAEA',
      fontSize: '1.0rem',
    },
    h7bb: {
      color: '#000000',
      fontSize: '1.0rem',
    },
    h8b: {
      color: '#000000',
      fontSize: '0.9rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
    },
    h9g: {
      color: '#5F8D85',
      fontSize: '1.1rem',
      fontFamily: 'Garamond',
      marginBottom: '10px',
      paddingLeft: '10px',
    },
    h9b: {
      color: '#000',
      fontSize: '1.1rem',
      fontFamily: 'Garamond',
      marginBottom: '10px',
      paddingLeft: '10px',
    },
    h9bwpm: {
      color: '#000',
      fontSize: '1.1rem',
      fontFamily: 'Garamond',
    },
    subTitle: {
      color: '#5F8D85',
      fontSize: '2rem',
      fontFamily: 'Garamond',
    },
    p: {
      color: '#EAEAEA',
      fontSize: '0.9rem',
      fontFamily: 'Garamond',
    },
    '@font-face': {
      fontFamily: 'Garamond',
      src: 'url("../fonts/Nunito-Regular.ttf") format("truetype")',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  status: {
    success: green[500],
    error: red[500],
  },
});

export default theme;
