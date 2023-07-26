import axios from 'axios';

// Création d'une instance Axios
const instance = axios.create({
  baseURL: 'https://api.gyozilla-restaurants.fr/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout d'un intercepteur de requête
instance.interceptors.request.use(
  (config) => {
    // Récupération du token depuis le local storage
    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibGFzdG5hbWUiOiJSYWJiaXQiLCJmaXJzdG5hbWUiOiJSb2dlciIsInVzZXJuYW1lIjoicmFiYml0LnJvZ2VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjp0cnVlLCJmaWRlbGl0eVBvaW50cyI6MywiaWF0IjoxNjkwMjcwOTI4LCJleHAiOjE2OTAzNTczMjh9.KKNfCRROvK_orrQOsuVw7GYb8rb89AQYHTBnDiNPcIA';

    // Si il y a un token on l'ajoute dans l'en-tête de la requête
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajout d'un intercepteur de réponse
instance.interceptors.response.use(
  (response) => {
    if (response.data.message === 'Authentification réussi') {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.log(error.response);
      // Déconnexion de l'utilisateur et suppression du token
      localStorage.removeItem('token');
      // window.location.href = '/login'; // rediriger vers la page de connexion
    }
    return Promise.reject(error);
  }
);

export default instance;
