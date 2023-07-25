import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import React from 'react';
import CrudProducts from 'renderer/crudProducts/CrudProducts';
import CrudStock from 'renderer/crudStock/CrudStock';

const Home = ({ onLinkClick }) => {
  const handleLinkClick = (component) => {
    onLinkClick(component);
  };

  return (
    <Box sx={{ width: '80vw' }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={6}>
          <Link
            href="#"
            underline="none"
            onClick={() => handleLinkClick(<CrudProducts />)}
          >
            <Card>
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
                  <Typography variant="h3" color={'HighlightText'}>
                    LINK1
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link
            href="#"
            underline="none"
            onClick={() => handleLinkClick(<CrudStock />)}
          >
            <Card>
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
                  <Typography variant="h3" color={'HighlightText'}>
                    LINK2
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="#" underline="none">
            <Card>
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
                  <Typography variant="h3" color={'HighlightText'}>
                    LINK3
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="#" underline="none">
            <Card>
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
                  <Typography variant="h3" color={'HighlightText'}>
                    LINK4
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
