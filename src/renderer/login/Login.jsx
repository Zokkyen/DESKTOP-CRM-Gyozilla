import React, { useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../utils/context/UserContext';
import instance from '../utils/interceptor';
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
          initialValues={{
            email: 'rabbit.roger@gyozilla-amiens.fr',
            password: 'ilesttropfort',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const emailCheck = await instance.get(
                `https://api.gyozilla-restaurants.fr/api/employees/exist/${values.email}`
              );
              if (emailCheck.data.message === 'true') {
                try {
                  const signin = await instance.post(
                    'https://api.gyozilla-restaurants.fr/api/token',
                    values
                  );
                  if (signin.data.token) {
                    logIn(signin.data.token);
                    navigate('/home');
                  }
                  setSubmitting(false);
                } catch {
                  toast.error("Le mot de passe n'est pas valide.");
                }
              } else {
                toast.error("Le mail n'est pas valide.");
              }
            } catch (error) {
              toast.error(`Une erreur ${error} s'est produite.`);
            }
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
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Mot de passe"
            />
            <Button type="submit">Connexion</Button>
          </Form>
        </Formik>
      </Container>
      <ToastContainer />
    </>
  );
}
