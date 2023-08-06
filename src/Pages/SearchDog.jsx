import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { Grid, Box, Card, CardMedia, List, CardActions, Button, CardContent, Typography, Stack, CircularProgress, Accordion, AccordionSummary, AccordionDetails, IconButton, ListItem } from '@mui/material';
import { useBuscarInfoQuery } from "../Queries/queryDog";
import { LoremIpsum } from "lorem-ipsum";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Tooltip from '@mui/material/Tooltip';
import { ListDogs } from '../Queries/getDogs';
import { postInteraction } from '../Queries/postInteraction';


function SearchDog() {

  const [currentIndex, setCurrentIndex] = useState(0);

  //parametro pasado por url
  const { dogID: paramId } = useParams(); // Cambio de variable de id a paramId

  // Obtener datos de la api
  const [dogList, setDogList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await ListDogs();

        // Filtrar el perro por ID
        const filteredPerro = data.perro.filter(perro => perro.id !== parseInt(paramId));
        setDogList({ perro: filteredPerro });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dog list:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [paramId]);


  const [rechazado, setListadoR] = useState({
    name: [],
    url : []
  });
  const [aceptado, setListadoA] = useState({
    name: [],
    url: []
  });

  const [interacion, setInteraccion] = useState({
    idDogI: paramId,
    idDogC:0,
    preference: ""
  });



    //ACEPTADO EN EL MATCH
  const aceptarP = (itemID, itemName, itemURL) => {
    setListadoA((rechazadoAnterior) => ({
      name: [...rechazadoAnterior.name, itemName],
      url: [...rechazadoAnterior.url, itemURL],
    }));

    setInteraccion({
      idDogI: paramId,
      idDogC: parseInt(itemID),
      preference: "A"
    });

    postInteraction(interacion);    

    setCurrentIndex(currentIndex + 1);
  };

  //RECHAZADO EN EL MATCH
  const rechazarP = (itemID, itemName, itemURL) => {
    setListadoR((rechazadoAnterior) => ({
      name: [...rechazadoAnterior.name, itemName],
      url: [...rechazadoAnterior.url, itemURL]
    }));

    setInteraccion({
      idDogI: paramId,
      idDogC: parseInt(itemID),
      preference: "R"
    });

    postInteraction(interacion);

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 class="title">Match para perros</h1>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={3}
      >

        <Grid item xs={12} lg={4} bgcolor={"white"} borderRadius={5} justifyContent={'center'} alignItems={"center"}>
          <h1>Me quieres guau?</h1>
          


          {loading ? (
            <CircularProgress />
          ) : (
            currentIndex < dogList.perro.length && paramId !== dogList.perro[currentIndex].id ?(
              <Stack>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dogList.perro[currentIndex].name || "Cargando..."}
                  </Typography>
                </CardContent>

                <Card>
                  <CardMedia
                    component="img"
                    content="cover"
                    className="card-media"
                    height={500}
                    image={dogList.perro[currentIndex].urlP}
                    alt="Perro aleatorio"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: '100%',
                    }}
                  />
                </Card>
                <CardActions direction="row" spacing={2} ml={'25%'}>
                  <Tooltip title="Aceptar">
                    <IconButton variant="contained" disabled={loading !== false} color="success" onClick={() => aceptarP(dogList.perro[currentIndex].id,dogList.perro[currentIndex].name,dogList.perro[currentIndex].urlP)}>
                      <FavoriteIcon />
                    </IconButton >
                  </Tooltip>

                  <Tooltip title="Rechazar">
                    <IconButton variant="outlined" disabled={loading !== false} color="error" onClick={() => rechazarP(dogList.perro[currentIndex].id,dogList.perro[currentIndex].name,dogList.perro[currentIndex].urlP)}>
                      <HeartBrokenIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Stack>
            ) : (
              <p>¡Has completado la lista de perros!</p>
            )
          )}


        </Grid>


        <Grid item xs={6} lg={4}>
          <h1>Perros aceptados</h1>
          <List
            sx={{
              overflow: 'auto',
              maxHeight: 680,
            }}
          >
            {aceptado.name.map((item, index) => (
              <Stack key={index} marginBottom={2} >
                <Card key={index}>
                  <Stack direction={"row"}>
                    <CardMedia

                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={aceptado.url[index]}
                    />
                    <h4>{aceptado.name[index]}  </h4>
                  </Stack>
                </Card>
              </Stack>

            )).reverse()}
          </List>
        </Grid>



        <Grid item xs={6} lg={4}>
          <h1>Perros rechazados</h1>
          <List
            sx={{
              overflow: 'auto',
              maxHeight: 680,
            }}
          >
            {rechazado.name.map((item, index) => (
              <Stack key={index} marginBottom={2}>
                <Card >
                  <Stack direction={"row"}>
                    <CardMedia
                      component="img"
                      height={100}
                      style={{ maxWidth: '30%' }}
                      className="card-media" //Aplicar la clase de estilo al componente
                      image={rechazado.url[index]}
                    />
                    <h4>{rechazado.name[index]}</h4>
                  </Stack>
                </Card>
              </Stack>

            )).reverse()}
          </List>
        </Grid>


      </Grid>
    </Box >
  )
}

export default SearchDog