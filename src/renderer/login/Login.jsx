import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import instance from '../utils/Interceptor';
import GyozillaLogo from '../../images/logoHeader.png';

export default function Login() {
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 80,
          width: 350,
          objectFit: 'contain',
          marginBottom: '50px',
        }}
        alt="Logo de Gyozilla"
        src={GyozillaLogo}
      />
      <Container
        sx={{
          width: '350px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await instance.post(
                'https://api.gyozilla-restaurants.fr/api/token',
                values
              );

              if (response.data.token) {
                logIn(response.data.token);
                navigate('/home');
              }
            } catch (error) {
              // handle error
            }
            setSubmitting(false);
          }}
        >
          <Form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <Field
              name="email"
              type="email"
              as={TextField}
              label="Adresse mail"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Mot de passe"
            />
            <ErrorMessage name="password" component="div" />
            <Button type="submit">Connexion</Button>
          </Form>
        </Formik>
      </Container>
    </>
  );
}
