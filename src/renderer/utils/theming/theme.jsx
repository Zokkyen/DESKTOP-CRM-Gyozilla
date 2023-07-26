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
            color: 'red',
            backgroundColor: '#f6a400',
          },
          '&.active': {
            backgroundColor: 'yellow',
            borderRight: '5px solid red',
            color: 'red',
            '&:hover': {
              backgroundColor: 'green', // Optionnel, définissez la couleur souhaitée pour le hover des éléments actifs
            },
          },
        },
        selected: {
          backgroundColor: '#212830',
          color: '#f6a400',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#212830',
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

    //        Style des boutons        //
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#EAEAEA',
          backgroundColor: '#4c6e65',
          fontSize: '1.0rem',
          fontWeight: 'bold',
          // marginTop: "3vh",
          '&:hover': {
            color: '#EAEAEA',
            backgroundColor: '#f6a400',
          },
        },
        outlined: {
          color: '#F8A500',
          backgroundColor: '#EAEAEA',
          border: '1px solid #F8A500',
          marginTop: '3vh',
        },
        contained: {
          color: '#EAEAEA',
          backgroundColor: '#F8A500',
          border: '1px solid #EAEAEA',
          marginTop: '3vh',
          '&:hover': {
            color: '#F8A500',
            backgroundColor: '#EAEAEA',
            border: '1px solid #F8A500',
          },
        },
        annule: {
          backgroundColor: 'red',
          color: 'green',
          border: '1px solid yellow',
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
      main: '#F8A500',
    },
    title: {
      main: '#F8A500',
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
      color: '#F8A500',
      fontSize: '4rem',
      fontFamily: 'Garamond',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h6: {
      color: '#F8A500',
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
      color: '#F8A500',
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
      color: '#F8A500',
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
