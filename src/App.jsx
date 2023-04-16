import { useEffect, useState } from "react";
import { Grid, Box, Card, CardMedia, List, CardActions, Button, CardContent, Typography, Stack } from '@mui/material';
import axios from "axios";

function App() {
  const [rechazado, setListadoR] = useState({
    link: [],
    name: []
  });
  const [aceptado, setListadoA] = useState({
    link: [],
    name: []
  });
  const [imagenPerro, setImagenPerro] = useState(null);
  const [NombreP, setNombreP] = useState('');


  const obtenerImagenPerro = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setImagenPerro(response.data.message);
      });
  };

  useEffect(() => {
    obtenerImagenPerro();
    generateRandomString();
  }, []);

  //ACEPTADO EN EL MATCH
  const aceptarP = (itemURL, itemName) => {
    setListadoA((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName]
    }));
    obtenerImagenPerro();
    generateRandomString();
  };

  //RECHAZADO EN EL MATCH
  const rechazarP = (itemURL, itemName) => {
    setListadoR((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName]
    }));
    obtenerImagenPerro();
    generateRandomString();
  };


  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setNombreP(result1);
  }


  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1>Match para perros</h1>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={3}>
          <h1>Perros rechazados</h1>
          <List>
            {rechazado.link.map((item, index) => (
              <Stack key={index} marginBottom={2}>
                <Card >
                  <Stack direction={"row"}>
                    <CardMedia
                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={rechazado.link[index]}
                    />
                    <h1>{aceptado.name[index]}</h1>
                    <CardActions direction="row" spacing={2} ml={'25%'}>
                      <Button variant="contained" color="success">Arrepentirse</Button>
                    </CardActions>
                  </Stack>
                </Card>
              </Stack>

            ))}
          </List>
        </Grid>


        <Grid item xs={3}>
          <Stack alignItems="center" bgcolor={"white"} borderRadius={5}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {NombreP}
              </Typography>
            </CardContent>

            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                className="card-media"
                height={500}
                image={imagenPerro}
                alt="Perro aleatorio"
              />


            </Card>
            <CardActions direction="row" spacing={2} ml={'25%'}>
              <Button variant="contained" color="success" onClick={() => aceptarP(imagenPerro, NombreP)}>
                ACEPTAR
              </Button>
              <Button variant="outlined" color="error" onClick={() => rechazarP(imagenPerro, NombreP)}>
                RECHAZAR
              </Button>
            </CardActions>
          </Stack>

        </Grid>

        <Grid item xs={3}>
          <h1>Perros aceptados</h1>
          <List>
            {aceptado.link.map((item, index) => (
              <Stack key={index} marginBottom={2} >
                <Card key={index}>
                  <Stack direction={"row"}>
                    <CardMedia
                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={aceptado.link[index]}
                    />
                    <h1>{aceptado.name[index]}  </h1>
                    <CardActions direction="row" spacing={2} ml={'25%'}>
                      <Button variant="contained" color="success">Arrepentirse</Button>
                    </CardActions>

                  </Stack>


                </Card>
              </Stack>

            ))}
          </List>
        </Grid>
      </Grid>
    </Box >
  )
}

export default App


  // < Grid container spacing = { 2} >
  //       <Grid xs={4}>
  //       </Grid>
  //       <Grid xs={8}>
  //       </Grid>
  //     </Grid >