import { useEffect, useState } from "react";
// import './App.css'
import { Grid, Box, CardMedia, List, ListItem, Button, Stack } from '@mui/material';
import axios from "axios";

function App() {
  // const [perro, setLista] = useState([])

  const [rechazado, setListadoR] = useState([]);
  const [aceptado, setListadoA] = useState([]);
  const [imagenPerro, setImagenPerro] = useState(null);

  const obtenerImagenPerro = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setImagenPerro(response.data.message);
      });
  };

  useEffect(() => {
    obtenerImagenPerro();
  }, []);


  //ACEPTADO EN EL MATCH
  const aceptarP = (itemURL) => {
    setListadoA((aceptado) => [...aceptado, itemURL]);
    obtenerImagenPerro();
  };

  //RECHAZADO EN EL MATCH
  const rechazarP = (itemURL) => {
    setListadoR((rechazado) => [...rechazado, itemURL]);
    obtenerImagenPerro();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <List>
            {rechazado.map(
              (
                item,
                index // Parentesis
              ) => (
                <ListItem key={index}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={rechazado[index]}
                    alt="Paella dish"
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>

        <Grid item xs={6} centered>
          <CardMedia
            component="img"
            height="400"
            image={imagenPerro}
            alt="Perro aleatorio"
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={() => aceptarP(imagenPerro)}>
              ACEPTAR
            </Button>
            <Button variant="outlined" color="error" onClick={() => rechazarP(imagenPerro)}>
              RECHAZAR
            </Button>
          </Stack>
        </Grid>
        <Grid item xs>
          <List>
            {aceptado.map(
              (
                item,
                index // Parentesis
              ) => (
                <ListItem key={index}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={aceptado[index]}
                    alt="Paella dish"
                  />
                </ListItem>
              )
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default App


  // < Grid container spacing = { 2} >
  //       <Grid xs={4}>
  //       </Grid>
  //       <Grid xs={8}>
  //       </Grid>
  //     </Grid >