/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  Button,
  Paper,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEmployee } from '../utils/api-call/updateEmployee';
import { UserContext } from '../utils/context/UserContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    phone: '',
    login: '',
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        lastname: user.lastname || '',
        firstname: user.firstname || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        login: user.login || '',
      });
    }
  }, [user]);

  const onSubmit = (values) => {
    const changedValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    updateEmployee(user.id, changedValues)
      .then(() => {
        toast.success('Mise à jour réussie !');
        return true;
      })
      .catch((error) => {
        toast.error(
          `Une erreur ${error} s'est produite lors de la mise à jour.`
        );
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form
            style={{
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Paper style={{ padding: '2em' }}>
              <Grid container spacing={3} sx={{ position: 'relative' }}>
                <Grid item xs={12}>
                  <Typography variant="hboxb">
                    {user
                      ? `Profil de ${user.lastname} ${user.firstname}`
                      : "Profil de l'utilisateur"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastname"
                    type="text"
                    label="Nom"
                    value={initialValues.lastname}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstname"
                    type="text"
                    label="Prénom"
                    value={initialValues.firstname}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    value={initialValues.email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Mot de passe"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Visibility sx={{ color: '#000' }} />
                            ) : (
                              <VisibilityOff sx={{ color: '#000' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="phone"
                    type="tel"
                    label="Téléphone"
                    value={initialValues.phone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: '50px' }}>
                  <Field
                    as={TextField}
                    name="login"
                    type="text"
                    label="Login"
                    value={initialValues.login}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', justifyContent: 'end' }}
                >
                  <Button
                    type="submit"
                    color="primary"
                    sx={{ position: 'absolute', bottom: '0' }}
                  >
                    Mettre à jour
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
