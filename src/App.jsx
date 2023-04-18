import { useEffect, useState, useRef } from "react";
import { Grid, Box, Card, CardMedia, List, CardActions, Button, CardContent, Typography, Stack, CircularProgress } from '@mui/material';
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
  const [bControl, setbControl] = useState(false);
  const [loading, setLoading] = useState(true);
  const timer = useRef();

  const obtenerImagenPerro = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setImagenPerro(response.data.message);
        setbControl(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    obtenerImagenPerro();
    generateRandomString();
  }, []);

  //ACEPTADO EN EL MATCH
  const aceptarP = (itemURL, itemName) => {

    setbControl(false);

    setListadoA((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName]
    }));
    obtenerImagenPerro();
    generateRandomString();
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setbControl(true);
    }, 2000);
  };

  //RECHAZADO EN EL MATCH
  const rechazarP = (itemURL, itemName) => {

    setbControl(false);

    setListadoR((rechazadoAnterior) => ({
      link: [...rechazadoAnterior.link, itemURL],
      name: [...rechazadoAnterior.name, itemName]
    }));
    obtenerImagenPerro();
    generateRandomString();
    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setbControl(true);
    }, 2000);

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

  const eliminarPerroAceptado = (index, acre) => {

    if (acre === 0) {

      setListadoA((rechazadoAnterior) => ({
        link: [...rechazadoAnterior.link, rechazado.link[index]],
        name: [...rechazadoAnterior.name, rechazado.name[index]]
      }));

      const nuevosPerrosAceptados = {
        link: [...rechazado.link.slice(0, index), ...rechazado.link.slice(index + 1)],
        name: [...rechazado.name.slice(0, index), ...rechazado.name.slice(index + 1)]
      };
      setListadoR(nuevosPerrosAceptados);
    } else {

      setListadoR((rechazadoAnterior) => ({
        link: [...rechazadoAnterior.link, aceptado.link[index]],
        name: [...rechazadoAnterior.name, aceptado.name[index]]
      }));

      const nuevosPerrosAceptados = {
        link: [...aceptado.link.slice(0, index), ...aceptado.link.slice(index + 1)],
        name: [...aceptado.name.slice(0, index), ...aceptado.name.slice(index + 1)]
      };
      setListadoA(nuevosPerrosAceptados);
    }


  };


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
                    <h4>{rechazado.name[index]}</h4>
                    <CardActions direction="row" spacing={2} ml={'25%'}>
                      <Button variant="contained" color="success" onClick={() => eliminarPerroAceptado(index, 0)}>Arrepentirse</Button>
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
                hidden={loading}
                component="img"
                className="card-media"
                height={500}
                image={imagenPerro}
                alt="Perro aleatorio"
              />

              {loading && (
                <CircularProgress
                  size={60}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}

            </Card>
            <CardActions direction="row" spacing={2} ml={'25%'}>
              <Button variant="contained" disabled={bControl === false} color="success" onClick={() => aceptarP(imagenPerro, NombreP)}>
                ACEPTAR
              </Button>
              <Button variant="outlined" disabled={bControl === false} color="error" onClick={() => rechazarP(imagenPerro, NombreP)}>
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
                    <h4>{aceptado.name[index]}  </h4>
                    <CardActions direction="row" spacing={2} ml={'25%'}>
                      <Button variant="contained" color="success" onClick={() => eliminarPerroAceptado(index, 1)}>Arrepentirse</Button>
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